import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import settings from 'settings';
import AppPages from 'apps/pages';
import AppObservation from 'apps/observation';
import Header from 'components/Header';

const Routes = props => (
  <Switch>
    <Route
      path="/pages"
      component={routerProps => (
        <div>
          <Header />

          <AppPages {...routerProps} />
        </div>
      )}
    />

    { settings.ENABLE_FEATURE_OBSERVATION && (
      <Route
        path="/observation"
        component={routerProps => (
          <div>
            <Header />

            <AppObservation
              {...routerProps}
              routeNotFound={props.routeNotFound}
            />
          </div>
        )}
      />
    )}

    <Redirect from="/" to="/pages/readme" exact />

    <Redirect to={props.routeNotFound} />
  </Switch>
);

Routes.propTypes = {
  routeNotFound: PropTypes.string,
};

Routes.defaultProps = {
  routeNotFound: '/pages/notfound',
};

export default Routes;
