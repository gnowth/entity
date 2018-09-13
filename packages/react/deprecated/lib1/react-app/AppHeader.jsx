import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = ({ className, children }) => (
  <div className={className}>{children}</div>
);

AppHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppHeader.defaultProps = {
  children: null,
};

export default AppHeader;
