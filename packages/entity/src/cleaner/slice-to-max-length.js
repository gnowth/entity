import _ from 'lodash';

export default (value, { field }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_.isString(value)) throw new Error('cleaners.removeMultiSpace: value must be of type string');
  }

  return field.maxLength
    ? value.slice(0, field.maxLength)
    : value;
};
