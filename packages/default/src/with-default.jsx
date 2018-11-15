import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';
import _omitBy from 'lodash/omitBy';
import React from 'react';

import { Consumer } from './context';

const getProps = (context, props, mapProps) => {
  if (!mapProps) {
    return { defaults: context };
  }

  const computedMapProps = _isFunction(mapProps)
    ? mapProps(props)
    : mapProps;

  return _mapValues(
    computedMapProps,
    (value) => {
      const computedValues = Array.isArray(value) ? value : [value];
      const computedValue = computedValues.find(val => context[val]);

      return computedValue ? context[computedValue] : undefined;
    },
  );
};

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default options => (ComposedComponent) => {
  const withDefault = props => (
    <Consumer>
      { context => (
        <ComposedComponent
          {...getProps(context, props, options)}
          {..._omitBy(props, prop => prop === undefined)}
        />
      )}
    </Consumer>
  );

  withDefault.displayName = `withDefault(${getDisplayName(ComposedComponent)})`;

  return withDefault;
};
