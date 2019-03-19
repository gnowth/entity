import _ from 'lodash';
import React from 'react';

import Query from './query';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (configs = {}) => (ComposedComponent) => {
  const withQuery = props => (
    <Query
      component={ComposedComponent}
      componentProps={props}
      {...(
        _.isFunction(configs)
          ? configs(props)
          : configs
      )}
    />
  );

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return withQuery;
};
