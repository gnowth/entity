import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { App } from '@gnowth/entity-app';
import ScreenLocal from 'apps/snippet/screens/Local';
import ScreenProject from 'apps/snippet/screens/Project';

const AppSnippet = () => (
  <App>
    App Snippet

    <Switch>
      <Route path="/snippet/local" component={ScreenLocal} />

      <Route path="/snippet/project" component={ScreenProject} />

      <Redirect from="/snippet" to="snippet/local" exact />
    </Switch>
  </App>
);

export default AppSnippet;
