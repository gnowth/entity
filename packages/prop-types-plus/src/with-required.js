import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

export default (propType) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (withRequired): propType argument must be a function');
  }

  const relayedPropType = (...args) => propType(...args);

  relayedPropType.isRequired = (...args) => PropTypes.any.isRequired(...args) || propType(...args);

  return relayedPropType;
};
