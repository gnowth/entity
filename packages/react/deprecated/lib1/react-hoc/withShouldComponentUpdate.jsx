import _isFunction from 'lodash/fp/isFunction';
import React from 'react';

export default function (predicate) {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) {
      throw new Error('react-hoc(withShouldComponentUpdate): Predicate is required');
    }
  }

  return ComposedComponent => class withShouldComponentUpdate extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return predicate({ nextProps, nextState, props: this.props, state: this.state });
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
}
