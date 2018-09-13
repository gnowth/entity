import React from 'react';
import { Map } from 'immutable';

export default function ({ state = 'state', setState = 'setState', initialState = Map({}) } = {}) {
  return ComposedComponent => class FNControllerState extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: initialState };

      this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
      const { name, value: newValue } = event.target;
      this.setState(prevState => ({
        value: name ? prevState.value.set(name, newValue) : prevState.value.merge(newValue),
      }));
    }

    render() {
      const props = Object.assign({}, this.props, {
        [state]: this.state.value,
        [setState]: this.handleOnChange,
      });

      return <ComposedComponent {...props} />;
    }
  };
}
