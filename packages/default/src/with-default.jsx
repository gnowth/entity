import _flow from 'lodash/flow';
import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import _omitBy from 'lodash/omitBy';
import _pick from 'lodash/pick';
import React from 'react';

import { Consumer } from './context';

const getProps = (context, props, options = {}) => {
  if (!options.nameMapper) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.filtered && !options.nameMapper) throw new Error('withDefault: option "filtered" cannot be set if "nameMapper" is not set');
    }

    return { default: context };
  }

  const nameMap = _isFunction(options.nameMapper)
    ? options.nameMapper(props)
    : options.nameMapper;

  return _flow(
    // filter context as per nameMapper if 'filtered' is set
    c => (options.filtered ? _pick(c, Object.keys(nameMap)) : c),

    // transform props name as per nameMap
    c => _mapKeys(c, (value, key) => nameMap[key] || key),
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
