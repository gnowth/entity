import _isObjectLike from 'lodash/isObjectLike';
import _isString from 'lodash/isString';
import _mapValues from 'lodash/mapValues';
import React from 'react';

import { Context } from './context';

export default (props, mapDefaultToProps) => {
  const context = props.defaults || React.useContext(Context);

  if (!mapDefaultToProps) {
    return context;
  }

  if (process.env.NODE_ENV === 'production') {
    if (Array.isArray(mapDefaultToProps)) throw new Error('default: mapDefaultToProps must be an object');
    if (!_isObjectLike(mapDefaultToProps)) throw new Error('default: mapDefaultToProps must be an object');
  }

  return _mapValues(
    mapDefaultToProps,
    (value, key) => {
      if (props[key] !== undefined) return props[key];

      const computedValues = Array.isArray(value) ? value : [value];

      if (process.env.NODE_ENV === 'production') {
        if (computedValues.some(computedValue => !computedValue || !_isString(computedValue))) throw new Error('default: mapDefaultToProps must be an object of (string or array of string)');
      }

      const computedValue = computedValues.find(val => context[val]);

      return computedValue && context[computedValue];
    },
  );
};
