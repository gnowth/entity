import _flowRight from 'lodash/flowRight';
import _isFunction from 'lodash/isFunction';
import _mapKeys from 'lodash/mapKeys';
import React from 'react';
import { getDisplayName } from '@gnowth/higher-order-component';

import useQuery from './use-query';

export default (configs = {}) => (ComposedComponent) => {
  const withQuery = props => (
    <ComposedComponent
      {..._flowRight(
        queryProps => _mapKeys(queryProps, key => configs.mapProps?.[key] || key),
        useQuery,
        configurations => (_isFunction(configurations) ? configurations(props) : configurations),
      )(configs)}
      {...props}
    />
  );

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return React.memo(withQuery);
};
