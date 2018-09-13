import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SNNotFound from 'lib/components/screens/SNNotFound';
import SNChangeLog from 'lib/components/screens/SNChangeLog';

// import SNLogin from 'components/screens/SNLogin';
// import SNMain from 'components/screens/SNMain';
// import SNExample from 'components/screens/SNExample';
// import SNTest from 'components/screens/SNTest';
// import Demo from 'lib/snippets/demo';

const Routes = () => (
  <Switch>
    {/* <Route path="/" exact component={SNMain} /> */}
    {/* <Route path="/example" component={SNExample} /> */}
    {/* <Route path="/test" component={SNTest} /> */}
    <Route path="/demo" component={Demo} />

    <Route path="/changelog" component={SNChangeLog} />
    <Route path="/notfound" component={SNNotFound} />
    {/* <Route path="/login" component={SNLogin} /> */}
    <Route render={() => (<Redirect to="/notfound" />)} />
  </Switch>
);

export default Routes;
