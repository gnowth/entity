import React from 'react';

import getDisplayName from '../get-display-name';

// eslint-disable-next-line react/forbid-foreign-prop-types
export default ({ propTypes, defaultProps } = {}) => (ComposedComponent) => {
  const withPropTypes = props => <ComposedComponent {...props} />;

  withPropTypes.propTypes = propTypes;
  withPropTypes.defaultProps = defaultProps;
  withPropTypes.displayName = `withPropTypes(${getDisplayName(ComposedComponent)})`;

  return withPropTypes;
};
