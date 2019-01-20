const path = require('path');

module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(__dirname, './jest-file.mock.js'),
    '\\.(css|less)$': path.join(__dirname, './jest-style.mock.js'),
  },

  resolver: 'jest-webpack-resolver',

  rootDir: process.cwd(),

  setupFiles: [
    'jest-prop-type-error',
  ],
};
