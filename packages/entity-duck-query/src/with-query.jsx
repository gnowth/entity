import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import React from 'react';
import { getDisplayName } from '@gnowth/higher-order-component';

import Query from './query';

export default (options = {}) => (ComposedComponent) => {
  const withQuery = (props) => {
    const computedOptions = _isFunction(options) ? options(props) : options;

    return (
      <Query action={props.action} {...computedOptions.componentProps || {}}>
        { context => (
          <ComposedComponent
            {..._mapKeys(context, (_, key) => computedOptions.mapProps?.[key] || key)}
            {...props}
          />
        )}
      </Query>
    );
  };

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return withQuery;
};
