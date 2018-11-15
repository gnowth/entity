import _isFunction from 'lodash/isFunction';

import isRequired from './is-required';

export default predicate => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('validators.isRequiredIf: predicate argument must be of type function');
  }

  return predicate({ value, ...options }) && isRequired(value, options);
};
