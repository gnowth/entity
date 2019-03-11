import PropTypes from 'prop-types';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { AuthenticatedRoute } from '@apps/auth';
import { App } from '@gnowth/app';
import { Redirect, Switch } from 'react-router-dom';

import ScreenObservation from 'apps/observation/screens/Observation';
import ScreenObservations from 'apps/observation/screens/Observations';

const AppObservation = props => (
  <App>
    <Switch>
      <AuthenticatedRoute
        path={`${props.match.url}/list`}
        component={ScreenObservations}
      />

      <AuthenticatedRoute
        path={`${props.match.url}/:uuid?`}
        component={ScreenObservation}
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
