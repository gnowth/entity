const alias = require('./alias.config');

const moduleNameMapper = Object.assign(...Object.entries(alias).map(([key, value]) => ({
  [`^${key}(.*)$`]: `${value}$1`,
})));

module.exports = {
  moduleNameMapper: Object.assign(
    {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/configs/jest.file.mock.js',
      '\\.(css|less)$': '<rootDir>/configs/jest.style.mock.js',
    },
    moduleNameMapper // eslint-disable-line comma-dangle
  ),

  rootDir: process.cwd(),

  testRegex: './test/.*.(js|jsx)$',
};
