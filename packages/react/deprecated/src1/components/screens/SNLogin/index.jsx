import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import AuthenticationDuck from 'lib/duck-authentication';

import SC from './styles';

class SNLogin extends React.Component {
  componentDidMount() {
    this.props.whoAmI();
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <SC.Root>
        <div>
          <div>
            username:
            <input />

            password:
            <input />
          </div>

          <div>
            <button>signin</button>
          </div>
        </div>
      </SC.Root>
    );
  }
}

SNLogin.propTypes = {
  whoAmI: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default compose(
  AuthenticationDuck.connectDefault(),
)(SNLogin);
