import styled from 'styled-components';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import PropTypesRouter from 'react-router-prop-types';
import React from 'react';
import { App } from '@gnowth/app';
import { UIType, UIWell } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';
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

function AppPage(props) {
  const enhancedProps = useEnhance(props, { locales });

  return (
    <App {...enhancedProps}>
      <Switch>
        <Route
          path={`${enhancedProps.match.url}/changelog`}
          render={() => (
            <UIWell ratio={3} variant="page_flat">
              <Markdown className="markdown-body" source={changelog} />
            </UIWell>
          )}
        />

        <Route
          path={`${enhancedProps.match.url}/readme`}
          render={() => (
            <UIWell ratio={3} variant="page_flat">
              <Markdown className="markdown-body" source={readme} />
            </UIWell>
          )}
        />

        <Route
          path={`${enhancedProps.match.url}/notfound`}
          render={() => (
            <Screen>
              <UIType value={enhancedProps.locales.not_found} variant="h1" />
            </Screen>
          )}
        />

        <Redirect to={`${enhancedProps.match.url}/notfound`} push />
      </Switch>
    </App>
  );
}

AppPage.propTypes = {
  locales: PropTypes.exact({
    not_found: PropTypesPlus.locale,
  }),
  match: PropTypesRouter.match.isRequired,
};

AppPage.defaultProps = {
  locales: undefined,
};

export default React.memo(AppPage);
