import _ from 'lodash';
import React from 'react';

import getDisplayName from '../get-display-name';

export default ({ initialState = {}, mapProps = {} }) => (ComposedComponent) => {
  class WithState extends React.Component {
    state = _.isFunction(initialState)
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

  WithState.displayName = `WithState(${getDisplayName(ComposedComponent)})`;

  return WithState;
};
