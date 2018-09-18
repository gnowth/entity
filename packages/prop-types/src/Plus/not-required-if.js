import _isFunction from 'lodash/fp/isFunction';
import _isString from 'lodash/fp/isString';

import isUndefined from './is-undefined';
import withRequired from './with-required';

const propTypeNotRequiredIf = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (notRequiredIf): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (notRequiredIf): predicate argument must be of type function or string');
  }

  return (
    _isString(predicate)
      ? props[predicate]
      : predicate(props)
  )
    ? isUndefined(props, ...rest)
    : propType(props, ...rest);
};

export default withRequired(propTypeNotRequiredIf);
