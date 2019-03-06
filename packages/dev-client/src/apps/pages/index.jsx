import styled from 'styled-components';
import Markdown from 'react-markdown';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { App } from '@gnowth/app';
import { UIType, UICard } from '@gnowth/ui';
import { Redirect, Route, Switch } from 'react-router-dom';

import changelog from 'root/CHANGELOG.md';
import readme from 'root/README.md';

import locales from './locales';

const Screen = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const AppPages = props => (
  <App {...props}>
    <Switch>
      <Route
        path={`${props.match.url}/changelog`}
        render={() => (
          <UICard ratio={3} variant="page_flat">
            <Markdown className="markdown-body" source={changelog} />
          </UICard>
        )}
      />

      <Route
        path={`${props.match.url}/readme`}
        render={() => (
          <UICard ratio={3} variant="page_flat">
            <Markdown className="markdown-body" source={readme} />
          </UICard>
        )}
      />

      <Route
        path={`${props.match.url}/notfound`}
        render={() => (
          <Screen>
            <UIType value={locales.not_found} variant="h1" />
          </Screen>
        )}
      />

      <Redirect to={`${props.match.url}/notfound`} push />
    </Switch>
  </App>
);

AppPages.propTypes = {
  match: PropTypesRouter.match.isRequired,
};

export default React.memo(AppPages);
