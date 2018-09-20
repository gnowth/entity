import PropTypes from 'prop-types';
import _isFunction from 'lodash/fp/isFunction';
import _isString from 'lodash/fp/isString';

var allOfType = ((propTypes = []) => {
  const propType = (...rest) => {
    const failedPropType = propTypes.find(p => p(...rest));
    return failedPropType === null || failedPropType === void 0 ? void 0 : failedPropType(...rest);
  };

  propType.isRequired = (...rest) => {
    const failedPropType = [PropTypes.any.isRequired].concat(propTypes).find(p => p(...rest));
    return failedPropType === null || failedPropType === void 0 ? void 0 : failedPropType(...rest);
  };

  return propType;
});

var component = PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.symbol]);

var withRequired = (propType => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (withRequired): propType argument must be a function');
  }

  const newPropType = (...args) => propType(...args);

  newPropType.isRequired = allOfType([PropTypes.any.isRequired, newPropType]);
  return newPropType;
});

const propTypeIsRequiredIf = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (isRequiredIf): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (isRequiredIf): predicate argument must be of type function or string');
  }

  return (_isString(predicate) ? props[predicate] : predicate(props)) ? propType.isRequired(props, ...rest) : propType(props, ...rest);
};

var isRequiredIf = withRequired(propTypeIsRequiredIf);

const propTypeIsRequiredIfNot = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (isRequiredIfNot): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (isRequiredIfNot): predicate argument must be of type function or string');
  }

  return (_isString(predicate) ? props[predicate] : predicate(props)) ? propType(props, ...rest) : propType.isRequired(props, ...rest);
};

var isRequiredIfNot = withRequired(propTypeIsRequiredIfNot);

var isUndefined = ((props, propName, componentName) => props[propName] !== undefined && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be "undefined"`));

var notNull = ((props, propName, componentName) => props[propName] === null && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must not be "null"`));

const propTypeNotRequiredIf = (predicate, propType) => (props, ...rest) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (notRequiredIf): propType argument must be a function');
    if (!_isFunction(predicate) && !_isString(predicate)) throw new Error('PropTypes (notRequiredIf): predicate argument must be of type function or string');
  }

  return (_isString(predicate) ? props[predicate] : predicate(props)) ? isUndefined(props, ...rest) : propType(props, ...rest);
};

var notRequiredIf = withRequired(propTypeNotRequiredIf);

var provider = PropTypes.any; // TODO
// export default (props, propName, componentName) => props[propName] === null
//   && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must not be "null"`);

var index = {
  allOfType,
  component,
  isRequiredIf,
  isRequiredIfNot,
  isUndefined,
  notNull,
  notRequiredIf,
  provider,
  withRequired
};

export default index;
//# sourceMappingURL=development.js.map
