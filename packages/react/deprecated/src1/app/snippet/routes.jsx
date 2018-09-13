import React from 'react';
import { Route, Switch } from 'react-router-dom';


import SNBasic from './screens/SNBasic';

const Routes = () => (
  <Switch>
    <Route path="basic" component={SNBasic} />
  </Switch>
);

export default Routes;
