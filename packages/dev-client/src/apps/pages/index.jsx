import styled from 'styled-components';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { App } from '@gnowth/app';
import { UITypeSet, UIWell } from '@gnowth/ui';
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

const AppPage = props => (
  <App {...props}>
    <Switch>
      <Route
        path={`${props.match.url}/changelog`}
        component={() => (
          <UIWell ratio={3} variant="page_flat">
            <Markdown className="markdown-body" source={changelog} />
          </UIWell>
        )}
      />

      <Route
        path={`${props.match.url}/readme`}
        component={() => (
          <UIWell ratio={3} variant="page_flat">
            <Markdown className="markdown-body" source={readme} />
          </UIWell>
        )}
      />

      <Route
        path={`${props.match.url}/notfound`}
        component={() => (
          <Screen>
            <UITypeSet locale={locales.not_found} variant="header" />
          </Screen>
        )}
      />

      <Redirect to={`${props.match.url}/notfound`} push />
    </Switch>
  </App>
);

AppPage.propTypes = {
  locales: PropTypes.exact({
    not_found: PropTypesPlus.locale.isRequired,
  }),
  match: PropTypesRouter.match.isRequired,
};

AppPage.defaultProps = {
  locales,
};

export default AppPage;
