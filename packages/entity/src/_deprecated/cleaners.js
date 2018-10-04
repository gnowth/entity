import _isString from 'lodash/isString';

export const removeMultiSpace = (value) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isString(value)) throw new Error('cleaners (removeMultiSpace): value must be of type string');
  }

  return value.replace(/\s\s+/g, ' ');
};

export const sliceToMaxLength = (value, { field }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isString(value)) throw new Error('cleaners (removeMultiSpace): value must be of type string');
  }

  return field.maxLength
    ? value.slice(0, field.maxLength)
    : value;
};
