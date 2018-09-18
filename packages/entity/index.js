'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/entity.development.js');
} else {
  module.exports = require('./dist/entity.production.min.js');
}
