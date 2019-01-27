const path = require('path');

const configs = require('../../.eslintrc');

module.exports = {
  ...configs,

  settings: {
    ...configs.settings,

    'import/resolver': {
      webpack: {
        config: path.join(__dirname, '../../configs/webpack.config.js'),
      },
    },
  }
};
