import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppAuth from 'apps/auth';
import AppChangeLog from 'apps/changelog';
import AppDashboard from 'apps/dashboard';
import AppNotFound from 'apps/notfound';
import AppSnippet from 'apps/snippet';

import Authenticated from 'apps/auth/components/Authenticated';

const Routes = () => (
  <Switch>
    <Route path="/dashboard">
      <Authenticated>
        <AppDashboard />
      </Authenticated>
    </Route>

    <Route path="/auth">
      <AppAuth />
    </Route>

    <Route path="/changelog">
      <AppChangeLog />
    </Route>

    <Route path="/notfound">
      <AppNotFound />
    </Route>

    <Route path="/snippet">
      <AppSnippet />
    </Route>

    <Route render={() => (<Redirect to="/notfound" />)} />
  </Switch>
);

export default Routes;
