import _isFunction from 'lodash/isFunction';

export default predicate => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('Validators (isRequiredIf): predicate argument must be of type function');
  }

  return predicate({ value, ...options }) && isRequired(value, options);
};
