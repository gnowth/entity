if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.esm.min'); // eslint-disable-line global-require, import/no-unresolved
} else {
  module.exports = require('./development.esm'); // eslint-disable-line global-require, import/no-unresolved
}
