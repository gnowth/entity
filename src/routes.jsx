import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppAuth from 'apps/auth';
import AppChangeLog from 'apps/changelog';
import AppDashboard from 'apps/dashboard';
import AppHeader from 'apps/header';
import AppNotFound from 'apps/notfound';
import AppObservation from 'apps/observation';
import AppSnippet from 'apps/snippet';
import Authenticated from 'apps/auth/components/Authenticated';

// TODO need to rethink for nesting Authenticated as it is being mounted even if it is not going in the route
const Routes = () => (
  <Switch>
    <Route path="/auth" component={AppAuth} />

    <Route path="/changelog" component={AppChangeLog} />

    <Route path="/notfound" component={AppNotFound} />

    <Route path="/dashboard">
      <Authenticated>
        <AppDashboard />
      </Authenticated>
    </Route>

    <Route path="/observation">
      <AppHeader>
        <AppObservation />
      </AppHeader>
    </Route>

    <Route path="/snippet">
      <AppHeader>
        <AppSnippet />
      </AppHeader>
    </Route>

    <Redirect to="/notfound" />
  </Switch>
);

export default Routes;
