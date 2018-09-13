import React from 'react';
import PropTypes from 'prop-types';

const AppContent = ({ className, children }) => (
  <div className={className}>{children}</div>
);

AppContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppContent.defaultProps = {
  children: null,
};

export default AppContent;
