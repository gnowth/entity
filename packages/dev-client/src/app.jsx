import React from 'react';
import { Authenticate } from '@apps/auth';
import { AppRoot } from '@gnowth/app';
import { defaultTheme, GlobalStyles } from '@gnowth/style';
import { IntlProvider } from '@private/react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';

import Routes from './routes';
import defaults from './defaults';

const intlProviderProps = { locale: 'en', messages: {} };
const themeProviderProps = { theme: { ...defaultTheme, ...theme } };

const App = () => (
  <AppRoot
    defaults={defaults}
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
