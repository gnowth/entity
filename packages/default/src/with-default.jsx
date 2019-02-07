import _isFunction from 'lodash/isFunction';
import React from 'react';

import useDefault from './use-default';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default options => (ComposedComponent) => {
  const withDefault = (props) => {
    const defaults = useDefault(props, _isFunction(options) ? options(props) : options); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      <ComposedComponent
        {...props}
        {...(options ? defaults : { defaults })}
      />
    );
  };

  withDefault.displayName = `withDefault(${getDisplayName(ComposedComponent)})`;

  return withDefault;
};
