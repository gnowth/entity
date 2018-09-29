import React from 'react';
import { getDisplayName } from '@gnowth/higher-order-component';

import Query from './query';

export default options => (ComposedComponent) => {
  const withQuery = props => (
    <Query>
      { context => (
        <ComposedComponent
          {...getProps(context, props, options)}
          {..._omitBy(props, prop => prop === undefined)}
        />
      )}
    </Query>
  );

  withQuery.displayName = `withQuery(${getDisplayName(ComposedComponent)})`;

  return withQuery;
};
