import PropTypes from 'prop-types';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { ViewScreen } from '@entity/view';
import { App } from '@gnowth/app';
import { Redirect, Route, Switch } from 'react-router-dom';

import EntityObservation from 'apps/observation/entities/Observation';
import FormObservation from 'apps/observation/forms/Observation';
import ViewObservations from 'apps/observation/views/Observations';

const AppObservation = props => (
  <App>
    <Switch>
      <Route
        path={`${props.match.url}/list`}
        render={() => (
          <ViewScreen
            queryComponentProps={{
              action: () => EntityObservation.duck.actions.get(),
              component: ViewObservations,
            }}
          />
        )}
      />

      <Route
        path={`${props.match.url}/:uuid?`}
        render={routeProps => (
          <ViewScreen
            queryComponentProps={{
              action: () => EntityObservation.duck.actions.get({ id: routeProps.match.params.uuid || null }),
              component: FormObservation,
            }}
          />
        )}
        exact
      />

      <Redirect to={props.routeNotFound} />
    </Switch>
  </App>
);

AppObservation.propTypes = {
  match: PropTypesRouter.match.isRequired,
  routeNotFound: PropTypes.string.isRequired,
};

export default AppObservation;
