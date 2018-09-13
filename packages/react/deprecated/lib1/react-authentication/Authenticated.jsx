import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import AuthenticationDuck from 'lib/duck-authentication';

class Authenticated extends React.Component {
  componentDidMount() {
    this.props.whoami();
  }

  render() {
    return this.props.children;
  }
}

Authenticated.propTypes = {
  whoami: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Authenticated.defaultProps = {
  children: null,
};

export default compose(
  AuthenticationDuck.connectDefault(),
)(Authenticated);
