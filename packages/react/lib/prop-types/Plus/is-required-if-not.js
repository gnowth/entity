import _isFunction from 'lodash/fp/isFunction';
import _isString from 'lodash/fp/isString';
import withRequired from './with-required';

const propTypeIsRequiredIfNot = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (isRequiredIfNot): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (isRequiredIfNot): predicate argument must be of type function or string');
  }

  return (
    _isString(predicate)
      ? props[predicate]
      : predicate(props)
  )
    ? propType(props, ...rest)
    : propType.isRequired(props, ...rest);
};

export default withRequired(propTypeIsRequiredIfNot);
