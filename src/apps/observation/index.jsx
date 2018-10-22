import React from 'react';
import { App } from '@gnowth/app';
import { Route } from 'react-router-dom';

import ScreenObservation from 'apps/observation/screens/Observation';

const AppObservation = () => (
  <App>
    <Route path="/observation" component={ScreenObservation} />
  </App>
);

export default AppObservation;
