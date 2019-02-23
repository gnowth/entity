// Import files
import 'assets/favicon/favicon.ico';
import 'assets/favicon/manifest.json';
import 'assets/fonts/icon-font.css';
import 'assets/robots.txt';
import 'font-awesome/css/font-awesome.css';
import 'github-markdown-css/github-markdown.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'normalize.css/normalize.css';
import 'react-datepicker/dist/react-datepicker.css';

import setupAxios from './axios';
import setupWorkbox from './workbox';
import setupXDomain from './xdomain';

export default function ({ settings }) {
  setupAxios(settings);

  if (settings.ENABLE_FEATURE_WORKBOX) setupWorkbox(settings);
  if (settings.ENABLE_FEATURE_XDOMAIN) setupXDomain(settings);
}
