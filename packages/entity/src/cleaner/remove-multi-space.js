import _isString from 'lodash/isString';

export default (value) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isString(value)) throw new Error('cleaners.removeMultiSpace: value must be of type string');
  }

  return value.replace(/\s\s+/g, ' ');
};
