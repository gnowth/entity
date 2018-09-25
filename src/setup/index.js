// Import files
import 'normalize.css/normalize.css';
import 'assets/favicon/favicon.ico';
import 'assets/favicon/manifest.json';
import 'assets/robots.txt';

import settings from 'settings';
import setupAxios from './axios';
import setupGlobalStyles from './global-styles';
import setupXDomain from './xdomain';

export default function () {
  setupAxios();
  setupGlobalStyles();

  if (settings.XDOMAIN_ENABLED) {
    setupXDomain();
  }
}
