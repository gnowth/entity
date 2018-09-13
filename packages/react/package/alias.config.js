const path = require('path');

module.exports = {
  apps: path.join(__dirname, '../src/apps/'),
  assets: path.join(__dirname, '../assets/'),
  components: path.join(__dirname, '../src/components/'),
  entities: path.join(__dirname, '../src/entities'),
  lib: path.join(__dirname, '../lib/'),
  settings: path.join(__dirname, './settings.config.js'),
  src: path.join(__dirname, '../src/'),
  store: path.join(__dirname, '../src/store/'),
  styles: path.join(__dirname, '../src/styles/'),
};
