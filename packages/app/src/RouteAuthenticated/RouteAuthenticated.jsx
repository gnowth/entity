import PropTypesEntity from '@burnsred/prop-types-entity';
import React from 'react';
import { Route } from 'react-router-dom';

import hooks from './RouteAuthenticated.hooks';

const RouteAuthenticated = props => (
  <Route
    {...props}
    component={undefined}
    render={hooks.useHandleRender(props)}
  />
);

RouteAuthenticated.propTypes = {
  authEntity: PropTypesEntity.entity,
};

RouteAuthenticated.defaultProps = {
  authEntity: undefined,
};

export default RouteAuthenticated;
