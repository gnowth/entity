import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

import withRequired from './with-required';

const propTypeIsRequiredIf = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (isRequiredIf): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (isRequiredIf): predicate argument must be of type function or string');
  }

  return (
    _isString(predicate)
      ? props[predicate]
      : predicate(props)
  )
    ? propType.isRequired(props, ...rest)
    : propType(props, ...rest);
};

export default withRequired(propTypeIsRequiredIf);
