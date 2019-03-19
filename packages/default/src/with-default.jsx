import _ from 'lodash';
import React from 'react';

import useDefault from './use-default';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default configs => (ComposedComponent) => {
  function withDefault(props) {
    const defaults = useDefault(_.isFunction(configs) ? configs(props) : configs, props); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      <ComposedComponent
        {...props}
        {...(configs ? defaults : { defaults })}
      />
    );
  }

  withDefault.displayName = `withDefault(${getDisplayName(ComposedComponent)})`;

  return withDefault;
};
