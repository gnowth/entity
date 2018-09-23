import _isFunction from 'lodash/fp/isFunction';
import React from 'react';

export default function ({ initialState = {}, mapProps: { state = 'state', setState = 'setState' } = {} }) {
  return ComposedComponent => class withState extends React.Component {
    // TODO to remove after test
    // constructor(props) {
    //   super(props);
    //   this.state = _isFunction(initialState)
    //     ? initialState(props)
    //     : initialState;

    //   this.mounted = true;
    // }

    state = _isFunction(initialState)
      ? initialState(this.props)
      : initialState;

    // TODO find better pattern or mute only errors coming from onInputChange
    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = true;

    render() {
      const props = Object.assign(
        {},
        this.props,
        {
          [state]: this.state,
          [setState]: (...args) => this.mounted && this.setState(...args),
        },
      );

      return <ComposedComponent {...props} />;
    }
  };
}
