import styled from 'styled-components';
import React from 'react';
import { App } from '@gnowth/app';
import { Redirect, Route, Switch } from 'react-router-dom';

import ScreenLocal from 'apps/snippet/screens/Local';
import ScreenProject from 'apps/snippet/screens/Project';

const Header = styled.div`
  margin-left: 10px;
`;

const AppSnippet = () => (
  <App>
    <Header>App Snippet</Header>

    <Switch>
      <Route path="/snippet/local" component={ScreenLocal} />

      <Route path="/snippet/project" component={ScreenProject} />

      <Redirect from="/snippet" to="snippet/local" exact />
    </Switch>
  </App>
);

export default AppSnippet;
