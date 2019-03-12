import React from 'react';

import enhanceProp from './use-enhance-props';

const getDisplayName = ComposedComponent => ComposedComponent.displayName
  || ComposedComponent.name
  || 'Component';

export default (ComposedComponent) => {
  const withEnhanceProps = props => (
    <ComposedComponent {...enhanceProp(props, { clean: true })} />
  );

  withEnhanceProps.displayName = `withEnhanceProps(${getDisplayName(ComposedComponent)})`;

  return withEnhanceProps;
};
