import React from 'react';
import { Route } from 'react-router-dom';

import hooks from './AuthenticatedRoute.hooks';

const AuthenticatedRoute = props => (
  <Route
    {...props}
    component={undefined}
    render={hooks.useHandleRender(props)}
  />
);

export default AuthenticatedRoute;
