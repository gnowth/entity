// Import files
import 'normalize.css/normalize.css';
import 'assets/favicon/favicon.ico';
import 'assets/favicon/manifest.json';
import 'assets/robots.txt';

import settings from 'settings';
import setupAxios from 'lib/app-setup/axios';
import setupGlobalStyles from 'lib/app-setup/styled-components-global';
import setupXDomain from 'lib/app-setup/xdomain';

export default function () {
  setupAxios();
  setupGlobalStyles();

  if (settings.XDOMAIN_ENABLED) {
    setupXDomain();
  }
}
