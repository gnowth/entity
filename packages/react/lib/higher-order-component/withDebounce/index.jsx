import _debounce from 'lodash/fp/debounce';
import React from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';

import PropTypesPlus from 'lib/prop-types/Plus';

export default function ({ delay = 300 } = {}) {
  return Component => class DebouncedComponent extends React.Component {
    static propTypes = {
      value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      onChange: PropTypesPlus.isRequiredIfNot('readOnly', PropTypes.func),
      readOnly: PropTypes.bool,
      withDebounceDisabled: PropTypes.bool,
    };

    static defaultProps = {
      value: undefined,
      onChange: undefined,
      readOnly: false,
      withDebounceDisabled: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (process.env.NODE_ENV !== 'production') {
        if (prevState.withDebounceDisabled !== nextProps.withDebounceDisabled) throw new Error('withDebounce: props "withDebounceDisabled" cannot be a dynamic props');
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
    onChange = event => this.props.onChange && this.props.onChange(event);

    debouncedChange = _debounce(delay)(this.onChange);

    handleChange = ({ target: { name, value } }) => {
      const onChange = this.state.withDebounceDisabled
        ? this.onChange
        : this.debouncedChange;

      onChange({ target: { name, value } });
      this.setState({ value });
    }

    render() {
      return (
        <Component
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
        />
      );
    }
  };
}
