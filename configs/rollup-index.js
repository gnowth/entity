if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.min'); // eslint-disable-line global-require, import/no-unresolved
} else {
  module.exports = require('./development'); // eslint-disable-line global-require, import/no-unresolved
}
