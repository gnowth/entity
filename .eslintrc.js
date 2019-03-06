const DirectoryNamedPlugin = require('directory-named-webpack-plugin');

module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
  ],

  env: {
    node: true,
    es6: true,
    jest: true,
    browser: true,
    commonjs: true,
  },

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },

  plugins: [
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
  ],

  rules: {
    // disable camelcase
    camelcase: 0,

    'class-methods-use-this': 0,

    // use consistent for every element in array
    'function-paren-newline': ['error', 'consistent'],

    // disable for the following files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.js',
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.stories.jsx',
          '**/stories.jsx',
          '**/.storybook/**',
        ],
      },
    ],

    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['Label'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],

    // remove max-length for line. should consider restoring this one
    'max-len': 0,

    'no-underscore-dangle': 0,

    // use consistent for every element in object
    'object-curly-newline': ['error', { consistent: true }],

    // need to reconsider
    'react/destructuring-assignment': 0,

    'react-hooks/rules-of-hooks': 'error',

    // disabled until custom PropTypes is fixed
    'react/no-typos': 0,

    // ignore required prop-types for className
    'react/prop-types': [2, { ignore: ['className'] }],

    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'getters',
        'setters',
        'everything-else',
        'rendering',
      ],

      groups: {
        lifecycle: [
          'displayName',
          'contextTypes',
          'childContextTypes',
          'propTypes',
          'defaultProps',
          'getDerivedStateFromProps',
          'mixins',
          'statics',
          'constructor',
          'state',
          'instance-variables',
          '/^handle.+$/',
          'getChildContext',
          'getDefaultProps',
          'getInitialState',
          'getSnapshotBeforeUpdate',
          'componentDidCatch',
          'componentDidMount',
          'componentDidUpdate',
          'componentWillMount',
          'componentWillReceiveProps',
          'componentWillUnmount',
          'componentWillUpdate',
          'shouldComponentUpdate',
          'UNSAFE_componentWillReceiveProps',
          'UNSAFE_componentWillMount',
          'UNSAFE_componentWillUpdate',
        ],

        rendering: [
          '/^render.+$/',
          'render',
        ],
      },
    }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.jsx'],

            plugins: [
              new DirectoryNamedPlugin(true),
            ],
          },
        },
      },
    },

    react: {
      pragma: 'React',
      version: '16.8.4',
    },
  },
};
