import _flow from 'lodash/flow';
import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import _omitBy from 'lodash/omitBy';
import _pick from 'lodash/pick';
import React from 'react';

import { Consumer } from './context';

const getProps = (context, props, mapProps) => {
  if (!mapProps) {
    return { defaults: context };
  }

  const computedMapProps = _isFunction(mapProps)
    ? mapProps(props)
    : mapProps;

  return _flow(
    // filter context as per mapProps
    c => _pick(c, Object.keys(computedMapProps)),

    // transform props name as per nameMap
    c => _mapKeys(c, (_, key) => computedMapProps[key] || key),
  )(context);
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
