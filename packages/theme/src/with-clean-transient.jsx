import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import React from 'react';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (ComposedComponent, additional = []) => {
  const withCleanTransient = props => (
    <ComposedComponent {..._omitBy(_omit(props, additional), (value, key) => key.startsWith('$'))} />
  );

  withCleanTransient.displayName = `withCleanTransient(${getDisplayName(ComposedComponent)})`;

  return withCleanTransient;
};
