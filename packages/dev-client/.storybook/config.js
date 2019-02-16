/* eslint-disable react/jsx-filename-extension */
import 'assets/fonts/icon-font.css';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'normalize.css/normalize.css';

import { configure } from '@storybook/react';

const componentReq = require.context('src', true, /stories\.jsx$/);

configure(() => {
  componentReq.keys().forEach(filename => componentReq(filename));
}, module);
