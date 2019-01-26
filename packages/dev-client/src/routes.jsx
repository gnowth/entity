import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import settings from 'settings';
import Header from 'components/Header';

const AppPages = React.lazy(() => import('apps/pages'));
const AppObservation = React.lazy(() => import('apps/observation'));

const Routes = props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route
        path="/pages"
        render={routerProps => (
          <div>
            <Header />

            <AppPages {...routerProps} />
          </div>
        )}
      />

      { settings.ENABLE_FEATURE_OBSERVATION && (
        <Route
          path="/observation"
          render={routerProps => (
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
  </React.Suspense>
);

Routes.propTypes = {
  routeNotFound: PropTypes.string,
};

Routes.defaultProps = {
  routeNotFound: '/pages/notfound',
};

export default React.memo(Routes);
