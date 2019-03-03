import PropTypes from 'prop-types';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { AuthenticatedRoute } from '@apps/auth';
import { ViewScreen } from '@entity/view';
import { App } from '@gnowth/app';
import { Redirect, Switch } from 'react-router-dom';

import EntityObservation from 'apps/observation/entities/Observation';
import FormObservation from 'apps/observation/forms/Observation';
import ViewObservations from 'apps/observation/views/Observations';

const AppObservation = props => (
  <App>
    <Switch>
      <AuthenticatedRoute
        path={`${props.match.url}/list`}
        component={ViewScreen}
        componentProps={{
          queryComponentProps: {
            action: EntityObservation.duck.actions.get(),
            component: ViewObservations,
          },
        }}
      />

      <AuthenticatedRoute
        path={`${props.match.url}/:uuid?`}
        component={ViewScreen}
        componentProps={routeProps => ({
          queryComponentProps: {
            action: EntityObservation.duck.actions.get({ id: routeProps.match.params.uuid || null }),
            component: FormObservation,
          },
        })}
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
