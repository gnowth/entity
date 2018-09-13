import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { HashRouter as Router } from 'react-router-dom';

import theme from 'styles';
import store, { history } from 'store';

import Routes from './routes';
import setup from './setup';
import intl from './intl';

setup();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider {...intl({ locale: 'en' })}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Router>
            <Routes />
          </Router>
        </ConnectedRouter>
      </ThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);
