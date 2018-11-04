import React from 'react';
import { ViewScreen } from '@entity/view';
import { App } from '@gnowth/app';
import { Redirect, Route, Switch } from 'react-router-dom';

import EntityObservation from 'apps/observation/entities/Observation';
import FormObservation from 'apps/observation/forms/Observation';
import ViewObservations from 'apps/observation/views/Observations';

const AppObservation = () => (
  <App>
    <Switch>
      <Route
        path="/observation/list"
        render={() => (
          <ViewScreen
            queryComponentProps={{
              action: () => EntityObservation.duck.get(),
              component: ViewObservations,
            }}
          />
        )}
      />

      <Route
        path="/observation/:uuid?"
        render={routeProps => (
          <ViewScreen
            queryComponentProps={{
              action: () => EntityObservation.duck.get({ id: routeProps.match.params.uuid || null }),
              component: FormObservation,
            }}
          />
        )}
        exact
      />

      <Redirect to="/notfound" />
    </Switch>
  </App>
);

export default AppObservation;
