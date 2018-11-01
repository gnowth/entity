// Import files
import 'normalize.css/normalize.css';
import 'assets/favicon/favicon.ico';
import 'assets/favicon/manifest.json';
import 'assets/robots.txt';

import setupAxios from './axios';
import setupXDomain from './xdomain';

export default function ({ settings }) {
  setupAxios(settings);

  if (settings.XDOMAIN_ENABLED) {
    setupXDomain(settings);
  }
}
