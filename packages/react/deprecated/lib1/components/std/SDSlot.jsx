import React from 'react';
import PropTypes from 'prop-types';

const SDSlot = ({ name, children }) => React.Children
  .map(children, child => child.props['data-slot'] === name && child);

SDSlot.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SDSlot.defaultProps = {
  children: null,
};

export default SDSlot;
