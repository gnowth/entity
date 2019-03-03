import React from 'react';
import { Route } from 'react-router-dom';

import hooks from './AuthenticatedRoute.hooks';

function AuthenticatedRoute(props) {
  return (
    <Route
      {...props}
      component={undefined}
      render={hooks.useHandleRender(props)}
    />
  );
}

export default AuthenticatedRoute;
