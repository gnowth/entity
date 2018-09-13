import React from 'react';

// eslint-disable-next-line react/forbid-foreign-prop-types
export default ({ propTypes, defaultProps } = {}) => (Component) => {
  const withPropsValidation = props => <Component {...props} />;

  withPropsValidation.propTypes = propTypes;
  withPropsValidation.defaultProps = defaultProps;

  return withPropsValidation;
};
