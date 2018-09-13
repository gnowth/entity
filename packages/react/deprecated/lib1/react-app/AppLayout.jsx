import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({ className, children }) => (
  <div className={className}>{children}</div>
);

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
