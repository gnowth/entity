const path = require('path');

module.exports = {
  apps: path.join(__dirname, '../src/apps/'),
  assets: path.join(__dirname, '../assets/'),
  settings: path.join(__dirname, './settings.config.js'),
  src: path.join(__dirname, '../src/'),
  store: path.join(__dirname, '../src/store.js'),
  styles: path.join(__dirname, '../src/styles/'),
};
