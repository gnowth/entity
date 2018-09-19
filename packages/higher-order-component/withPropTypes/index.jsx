import React from 'react';

// eslint-disable-next-line react/forbid-foreign-prop-types
export default ({ displayName, propTypes, defaultProps } = {}) => (Component) => {
  const withPropTypes = (props) => {
    return (<Component {...props} />);
  };

  withPropTypes.propTypes = propTypes;
  withPropTypes.defaultProps = defaultProps;
  withPropTypes.displayName = `withPropTypes-${displayName}`;

  return withPropTypes;
};
