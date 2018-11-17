import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import settings from 'settings';
import AppPages from 'apps/pages';
import AppObservation from 'apps/observation';
import Header from 'components/Header';

const Routes = () => (
  <Switch>
    <Route
      path="/pages"
      component={props => (
        <div>
          <Header />
          <AppPages {...props} />
        </div>
      )}
    />

    { settings.ENABLE_FEATURE_OBSERVATION && (
      <Route
        path="/observation"
        component={() => (
          <div>
            <Header />
            <AppObservation />
          </div>
        )}
      />
    )}

    <Redirect from="/" to="/pages/readme" exact />

    <Redirect to="/pages/notfound" />
  </Switch>
);

export default Routes;
