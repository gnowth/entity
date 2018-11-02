module.exports = {
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          'jsx',
          'objectRestSpread',
          ['decorators', { decoratorsBeforeExport: true }],
          'classProperties',
          'exportExtensions',
          'asyncGenerators',
          'functionBind',
          'functionSent',
          'dynamicImport',
          'optionalCatchBinding',
          'optionalChaining',
          'exportNamespaceFrom',
        ],
      },
    ],
  ],

  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],

  syntax: 'scss',

  rules: {
    'comment-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'value-list-max-empty-lines': null,
  },
};
