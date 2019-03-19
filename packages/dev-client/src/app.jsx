import standardTheme from '@gnowth/theme-standard';
import PropTypes from 'prop-types';
import React from 'react';
import { AppRoot, Authenticate } from '@gnowth/app';
import { GlobalStyles } from '@gnowth/theme';
import { IntlProvider } from '@private/react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';
import EntityAppClient from 'entities/AppClient';
import EntityAuth from 'apps/people/entities/Auth';

import defaults from './defaults';

const intlProviderProps = { locale: 'en', messages: {} };
const themeProviderProps = { theme: { ...standardTheme, ...theme } };

const App = props => (
  <AppRoot
    authEntity={EntityAuth}
    defaults={defaults}
    entity={EntityAppClient}
    intlProvider={IntlProvider}
    intlProviderProps={intlProviderProps}
    themeProvider={ThemeProvider}
    themeProviderProps={themeProviderProps}
  >
    <Authenticate />

    <GlobalStyles />

    { props.children }
  </AppRoot>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
