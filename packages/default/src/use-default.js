import _ from 'lodash';
import React from 'react';

import { DefaultContext } from './context';

export default function (mapDefault, defaults = {}) {
  const context = React.useContext(DefaultContext) || defaults;

  if (!mapDefault) return context;

  if (process.env.NODE_ENV === 'production') {
    if (Array.isArray(mapDefault)) throw new Error('default: mapDefault must be an object');
    if (!_.isObjectLike(mapDefault)) throw new Error('default: mapDefault must be an object');
  }

  return React.useMemo(
    () => _.mapValues(
      mapDefault,
      (value, key) => {
        if (defaults[key] !== undefined) return defaults[key];

        const computedValues = Array.isArray(value) ? value : [value];

        if (process.env.NODE_ENV === 'production') {
          if (computedValues.some(computedValue => !computedValue || !_.isString(computedValue))) throw new Error('default: mapDefault must be an object of (string or array of string)');
        }

        const computedValue = computedValues.find(val => context[val]);

        return computedValue && context[computedValue];
      },
    ),
    [context, mapDefault, ..._.map(mapDefault, (val, key) => defaults[key])],
  );
}
