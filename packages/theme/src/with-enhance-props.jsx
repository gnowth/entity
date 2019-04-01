import React from 'react';

import useEnhanceProp from './use-enhance-props';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (ComposedComponent) => {
  const withEnhanceProps = props => (
    <ComposedComponent {...useEnhanceProp(ComposedComponent, props, { clean: true })} /> // eslint-disable-line react-hooks/rules-of-hooks
  );

  withEnhanceProps.displayName = `withEnhanceProps(${getDisplayName(ComposedComponent)})`;

  return withEnhanceProps;
};
