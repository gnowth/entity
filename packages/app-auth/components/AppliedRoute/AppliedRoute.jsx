import React from 'react';
import { Route } from 'react-router-dom';

import hooks from './AppliedRoute.hooks';

function AppliedRoute(props) {
  return (
    <Route
      {...props}
      component={undefined}
      render={hooks.useHandleRender(props)}
    />
  );
}

export default AppliedRoute;
