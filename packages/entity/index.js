if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/production.min');
} else {
  module.exports = require('./dist/development');
}
