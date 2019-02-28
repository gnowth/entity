/* eslint-disable react/jsx-filename-extension */
import 'assets/fonts/icon-font.css';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'normalize.css/normalize.css';

import React from 'react';
import { defaultTheme, GlobalStyles } from '@gnowth/style';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';
import store, { history } from 'store';

const componentReq = require.context('src', true, /stories\.jsx$/);
const themeProviderProps = { theme: { ...defaultTheme, ...theme } };

addDecorator(withNotes);

addDecorator(withOptions({
  sortStoriesByKind: true,
}));

addDecorator(story => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { story() }
    </ConnectedRouter>
  </Provider>
));

addDecorator(story => (
  <IntlProvider locale="en" messages={{}}>
    { story() }
  </IntlProvider>
));

addDecorator(story => (
  <ThemeProvider {...themeProviderProps}>
    <>
      { story() }

      <GlobalStyles />
    </>
  </ThemeProvider>
));

configure(() => {
  componentReq.keys().forEach(filename => componentReq(filename));
}, module);
