import PropTypes from 'prop-types';
import React from 'react';

const Authenticated = props => (
  <div>
    { props.children }
  </div>
);

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authenticated;
