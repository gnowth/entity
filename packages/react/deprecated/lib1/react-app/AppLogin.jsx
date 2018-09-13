import React from 'react';
import PropTypes from 'prop-types';

const AppLogin = ({ className, children }) => (
  <div className={className}>{children}</div>
);

AppLogin.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppLogin.defaultProps = {
  children: null,
};

export default AppLogin;
