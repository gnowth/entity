import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoot } from '@gnowth/app';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { HashRouter as Router } from 'react-router-dom';

import theme from 'styles';
import settings from 'settings';
import store, { history } from 'store';

import Routes from './routes';
import defaults from './defaults';
import setup from './setup';

setup({ settings, theme });

function render() {
  ReactDOM.render(
    <AppRoot
      defaults={defaults}
      intlProvider={IntlProvider}
      intlProviderProps={{ locale: 'en', messages: {} }}
      themeProvider={ThemeProvider}
      themeProviderProps={{ theme }}
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <Routes />
          </Router>
        </ConnectedRouter>
      </Provider>
    </AppRoot>,
    document.getElementById('root'),
  );
}

if (window.Intl) render();
else require.ensure(['intl'], render);
