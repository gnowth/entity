import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import PropTypes from 'prop-types';
import React from 'react';
import { getDisplayName } from '@gnowth/higher-order-component';

import Query from './query';

export default (configs = {}) => (ComposedComponent) => {
  const withQuery = (props) => {
    const computedOptions = _isFunction(configs) ? configs(props) : configs;

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

  withQuery.propTypes = {
    action: PropTypes.func.isRequired,
  };

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return withQuery;
};
