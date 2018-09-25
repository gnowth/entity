module.exports = {
  processors: [
    'stylelint-processor-styled-components',
  ],

  extends: [
    'stylelint-config-standard',
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
