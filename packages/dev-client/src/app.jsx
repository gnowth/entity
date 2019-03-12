import React from 'react';
import { AppRoot, Authenticate } from '@gnowth/app';
import { defaultTheme, GlobalStyles } from '@gnowth/theme';
import { IntlProvider } from '@private/react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';
import EntityAppClient from 'entities/AppClient';
import EntityAuth from 'apps/people/entities/Auth';

import Routes from './routes';
import defaults from './defaults';

const intlProviderProps = { locale: 'en', messages: {} };
const themeProviderProps = { theme: { ...defaultTheme, ...theme } };

const App = () => (
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

    <Routes />

    <GlobalStyles />
  </AppRoot>
);

export default App;
