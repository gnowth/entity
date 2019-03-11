import React from 'react';
import { Route } from 'react-router-dom';

import hooks from './RouteApplied.hooks';

function RouteApplied(props) {
  return (
    <Route
      {...props}
      component={undefined}
      render={hooks.useHandleRender(props)}
    />
  );
}

export default RouteApplied;
