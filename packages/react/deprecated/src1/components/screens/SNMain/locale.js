import _mapValues from 'lodash/mapValues';

const createDefault = (locale, prefix) => _mapValues(locale, (value, key) => `${prefix}.${key}`);

export const locale = {
  pageNotFound: 'Page Not Found',
};

export default createDefault(locale, 'screens.SNMain');
