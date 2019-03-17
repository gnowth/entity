import _ from 'lodash';
import React from 'react';

import getDisplayName from '../get-display-name';

export default (componentProps = {}) => (ComposedComponent) => {
  const withProps = props => (
    <ComposedComponent
      {...props}
      {...(_.isFunction(componentProps) ? componentProps(props) : componentProps)}
    />
  );

  withProps.displayName = `withProps(${getDisplayName(ComposedComponent)})`;

  return withProps;
};
