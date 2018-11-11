import _isFunction from 'lodash/isFunction';
import React from 'react';

import getDisplayName from '../get-display-name';

export default (componentProps = {}) => (ComposedComponent) => {
  const withProps = props => (
    <ComposedComponent
      {...props}
      {...(_isFunction(componentProps) ? componentProps(props) : componentProps)}
    />
  );

  withProps.displayName = `withProps(${getDisplayName(ComposedComponent)})`;

  return withProps;
};
