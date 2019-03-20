if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.cjs.min'); // eslint-disable-line global-require, import/no-unresolved
} else {
  module.exports = require('./development.cjs'); // eslint-disable-line global-require, import/no-unresolved
}
