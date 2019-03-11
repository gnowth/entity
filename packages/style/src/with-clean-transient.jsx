import _omitBy from 'lodash/omitBy';
import React from 'react';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (ComposedComponent) => {
  const withCleanTransient = props => (
    <ComposedComponent {..._omitBy(props, (value, key) => key.startsWith('$'))} />
  );

  withCleanTransient.displayName = `withCleanTransient(${getDisplayName(ComposedComponent)})`;

  return withCleanTransient;
};
