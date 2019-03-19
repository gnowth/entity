import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import settings from 'settings';
import store, { history } from 'store';

import App from './app';
import Routes from './routes';
import setup from './setup';

setup(settings);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HashRouter>
          <App>
            <Routes />
          </App>
        </HashRouter>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

if (window.Intl) render();
else require.ensure(['intl'], render);
