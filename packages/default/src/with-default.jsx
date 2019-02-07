import _isFunction from 'lodash/isFunction';
import React from 'react';

import useDefault from './use-default';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default configs => (ComposedComponent) => {
  const withDefault = (props) => {
    const defaults = useDefault(props, _isFunction(configs) ? configs(props) : configs); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      <ComposedComponent
        {...props}
        {...(configs ? defaults : { defaults })}
      />
    );
  };

  withDefault.displayName = `withDefault(${getDisplayName(ComposedComponent)})`;

  return withDefault;
};
