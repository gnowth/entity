import _debounce from 'lodash/fp/debounce';
import React from 'react';
import PropTypes from 'prop-types';

export default function ({ renameValue = 'value', renameOnChange = 'onChange', debounceAmount = 1000 } = {}) {
  return ComposedComponent => class withHandleChangeDebounced extends React.Component {
    static propTypes = {
      [renameOnChange]: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = { value: props[renameValue] };

      this.handleChange = this.handleChange.bind(this);
      this.debounceChange = _debounce(debounceAmount)(this.debounceChange.bind(this));
    }

    componentWillReceiveProps(nextProps) {
      if (this.props[renameValue] !== nextProps[renameValue]) {
        this.setState({ value: nextProps[renameValue] });
      }
    }

    debounceChange({ target: { name, value: inputValue } }) {
      this.props[renameOnChange]({ target: { name, value: inputValue } });
    }

    handleChange({ target: { name, value: inputValue } }) {
      this.debounceChange({ target: { name, value: inputValue } });
      this.setState({ value: inputValue });
    }

    render() {
      const props = Object.assign({}, this.props, {
        [renameOnChange]: this.handleChange,
        [renameValue]: this.state.value,
      });

      return <ComposedComponent {...props} />;
    }
  };
}
