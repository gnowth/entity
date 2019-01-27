import _debounce from 'lodash/debounce';
import React from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';

import getDisplayName from '../get-display-name';

export default ({ delay = 300 } = {}) => (ComposedComponent) => {
  class withDebounce extends React.Component {
    static propTypes = {
      value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      onChange: PropTypes.func.isRequired,
      readOnly: PropTypes.bool,
      withDebounceDisabled: PropTypes.bool,
    };

    static defaultProps = {
      value: undefined,
      readOnly: false,
      withDebounceDisabled: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (process.env.NODE_ENV !== 'production') {
        if (prevState.withDebounceDisabled !== nextProps.withDebounceDisabled) throw new Error('withDebounce.getDerivedStateFromProps: props "withDebounceDisabled" cannot be a dynamic props');
      }

      return {
        prop_value: nextProps.value,
        value: is(prevState.prop_value, nextProps.value)
          ? prevState.value
          : nextProps.value,
        withDebounceDisabled: nextProps.withDebounceDisabled,
      };
    }

    state = {
      prop_value: this.props.value,
      value: this.props.value,
      withDebounceDisabled: this.props.withDebounceDisabled,
    };

    /** Note (thierry):
     * this onChange allows 'this.props.onChange' to be dynamic
     * as debounced function cannot be changed once initialised
     */
    onChange = event => this.props.onChange && this.props.onChange(event); // eslint-disable-line react/sort-comp

    debouncedChange = _debounce(this.onChange, delay);

    handleChange = ({ target: { name, value } }) => {
      const onChange = this.state.withDebounceDisabled
        ? this.onChange
        : this.debouncedChange;

      onChange({ target: { name, value } });
      this.setState({ value });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      );
    }
  }

  withDebounce.displayName = `withDebounce(${getDisplayName(ComposedComponent)})`;

  return withDebounce;
};
