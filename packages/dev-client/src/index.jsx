import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@gnowth/app';
import { defaultTheme, GlobalStyles } from '@gnowth/style';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { IntlProvider } from '@private/react-intl';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';
import settings from 'settings';
import store, { history } from 'store';

import Routes from './routes';
import defaults from './defaults';
import setup from './setup';

setup({ settings });

const intlProviderProps = { locale: 'en', messages: {} };
const themeProviderProps = { theme: { ...defaultTheme, ...theme } };

function render() {
  ReactDOM.render(
    <AppRoot
      defaults={defaults}
      intlProvider={IntlProvider}
      intlProviderProps={intlProviderProps}
      themeProvider={ThemeProvider}
      themeProviderProps={themeProviderProps}
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <Routes />
          </Router>
        </ConnectedRouter>
      </Provider>

      <GlobalStyles />
    </AppRoot>,
    document.getElementById('root'),
  );
}

if (window.Intl) render();
else require.ensure(['intl'], render);
