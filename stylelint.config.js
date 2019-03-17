module.exports = {
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          ['decorators', { decoratorsBeforeExport: true }],
          'asyncGenerators',
          'classProperties',
          'dynamicImport',
          'functionBind',
          'functionSent',
          'exportDefaultFrom',
          'exportExtensions',
          'exportNamespaceFrom',
          'jsx',
          'objectRestSpread',
          'optionalCatchBinding',
          'optionalChaining',
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
