/* eslint-disable react/jsx-filename-extension */
import 'normalize.css/normalize.css';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';

import theme from 'styles';
import setupGlobalStyles from 'src/setup/global-styles';

const componentReq = require.context('lib', true, /stories\.jsx$/);

setupGlobalStyles();

addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

configure(() => {
  componentReq.keys().forEach(filename => componentReq(filename));
}, module);
