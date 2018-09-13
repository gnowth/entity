import _isFunction from 'lodash/fp/isFunction';
import React from 'react';

export default predicate => ComposedComponent => function withPropMapper(props) {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('withPropMapper: "predicate" must be a function');
  }

  return <ComposedComponent {...props} {...predicate(props)} />;
};
