import _isFunction from 'lodash/isFunction';
import React from 'react';

import getDisplayName from '../get-display-name';

export default ({ initialState = {}, mapProps = {} }) => (ComposedComponent) => {
  class withState extends React.Component {
    state = _isFunction(initialState)
      ? initialState(this.props)
      : initialState;

    mounted = true;

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const props = Object.assign(
        {},
        this.props,
        {
          [mapProps.state || 'state']: this.state,
          [mapProps.setState || 'setState']: (...args) => this.mounted && this.setState(...args),
        },
      );

      return <ComposedComponent {...props} />;
    }
  }

  withState.displayName = `withState(${getDisplayName(ComposedComponent)})`;

  return withState;
};
