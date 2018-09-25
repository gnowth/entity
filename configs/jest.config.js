const alias = require('./alias.config');

const moduleNameMapper = Object.assign(...Object.entries(alias).map(([key, value]) => ({
  [`^${key}(.*)$`]: `${value}$1`,
})));

module.exports = {
  moduleNameMapper,
  rootDir: process.cwd(),
};
