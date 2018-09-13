import React from 'react';
import PropTypes from 'prop-types';

const AppDrawer = ({ className, children }) => (
  <div className={className}>{children}</div>
);

AppDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppDrawer.defaultProps = {
  children: null,
};

export default AppDrawer;
