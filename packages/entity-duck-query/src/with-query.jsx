import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import React from 'react';
import { getDisplayName } from '@gnowth/higher-order-component';

import useQuery from './use-query';

export default (configs = {}) => (ComposedComponent) => {
  function withQuery(props) {
    const configurations = _isFunction(configs) ? configs(props) : configs;
    const propsQuery = useQuery(configurations); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      <ComposedComponent
        {..._mapKeys(propsQuery, key => configurations.mapProps ?.[key] || key)}
        {...props}
      />
    );
  }

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return React.memo(withQuery);
};
