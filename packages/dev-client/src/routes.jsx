import PropTypes from 'prop-types';
import React from 'react';
import { AppliedRoute } from '@apps/auth';
import { Switch, Redirect } from 'react-router-dom';

import settings from 'settings';
import Header from 'components/Header';

const AppPages = React.lazy(() => import('apps/pages'));
const AppObservation = React.lazy(() => import('apps/observation'));

const Routes = props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Header />

    <Switch>
      <AppliedRoute
        path="/pages"
        component={AppPages}
      />

      { settings.ENABLE_FEATURE_OBSERVATION && (
        <AppliedRoute
          path="/observation"
          component={AppObservation}
          componentProps={{ routeNotFound: props.routeNotFound }}
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

export default Routes;
