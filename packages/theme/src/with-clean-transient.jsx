import _ from 'lodash';
import React from 'react';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (ComposedComponent, additional = []) => {
  const withCleanTransient = props => (
    <ComposedComponent {..._.omitBy(_.omit(props, additional), (value, key) => key.startsWith('$'))} />
  );

  withCleanTransient.displayName = `withCleanTransient(${getDisplayName(ComposedComponent)})`;

  return withCleanTransient;
};
