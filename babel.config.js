module.exports = {
  env: {
    library: {
      plugins: [
        ['transform-react-remove-prop-types', {
          mode: 'wrap',
          ignoreFilenames: ['node_modules'],
        }],
      ],
    },

    production: {
      plugins: [
        ['transform-react-remove-prop-types', {
          ignoreFilenames: ['node_modules'],
        }],
      ],
    },
  },

  presets: [
    [
      '@babel/env',
      {
        targets: {
          chrome: '67',
          edge: '17',
          firefox: '60',
          ie: '11',
          safari: '11.1',
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-idx',
    'babel-plugin-react-intl-auto',
    ['babel-plugin-styled-components', { pure: true }],
    'lodash',
  ],
};
