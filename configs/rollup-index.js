/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.min');
} else {
  module.exports = require('./development');
}
