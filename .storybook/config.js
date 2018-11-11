/* eslint-disable react/jsx-filename-extension */
import 'normalize.css/normalize.css';

import React from 'react';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import * as theme from 'styles';
import GlobalStyle from 'styles/global';

const componentReq = require.context('..', true, /stories\.jsx$/);

addDecorator(withNotes);

addDecorator(withOptions({
  sortStoriesByKind: true,
}));

addDecorator(story => (
  <IntlProvider >
    { story() }
  </IntlProvider>
));

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <>
      { story() }

      <GlobalStyle />
    </>
  </ThemeProvider>
));

configure(() => {
  componentReq.keys().forEach(filename => componentReq(filename));
}, module);
