import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { ViewScreen } from '@entity/view';
import { App } from '@gnowth/app';
import { Redirect, Route, Switch } from 'react-router-dom';

import EntityObservation from 'apps/observation/entities/Observation';
import FormObservation from 'apps/observation/forms/Observation';
import ViewObservations from 'apps/observation/views/Observations';

const AppObservation = props => (
  <App containerComponent={props.containerComponent}>
    <Switch>
      <Route
        path="/observation/list"
        component={() => (
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
        component={routeProps => (
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

AppObservation.propTypes = {
  containerComponent: PropTypesPlus.component,
};

AppObservation.defaultProps = {
  containerComponent: undefined,
};

export default AppObservation;
