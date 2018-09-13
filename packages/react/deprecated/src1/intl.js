import _map from 'lodash/map';
import _merge from 'lodash/merge';
import _flatMap from 'lodash/flatMap';
import _mapValues from 'lodash/fp/mapValues';

const req = require.context('src', true, /locale\.js$/);

const adjustValue = (value, key, defaultLocale) => (
  typeof value === 'object'
    ? _mapValues(v => ({ [key]: v }))(value)
    : { [defaultLocale]: { [key]: value } }
);

const adjustKey = (key, path) => path
  .replace('/locale.js', '')
  .replace(/components\//ig, '')
  .replace('./', '')
  .replace(/\//g, '.')
  .concat('.', key);

const adjustValues = (values, path, defaultLocale) => _map(
  values,
  (value, key) => adjustValue(value, adjustKey(key, path), defaultLocale),
);

const genDictionary = defaultLocale => _merge(
  {},
  ..._flatMap(
    req.keys(),
    path => adjustValues(req(path).locale, path, defaultLocale),
  ),
);

export default ({ locale, defaultLocale }) => ({
  locale,
  format: {},
  messages: {
    ...genDictionary(defaultLocale || locale)[locale],
  },
});
