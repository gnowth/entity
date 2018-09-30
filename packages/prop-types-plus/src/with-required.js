import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

import allOfType from './all-of-type';

export default (propType) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(propType)) throw new Error('PropTypesPlus (withRequired): propType argument must be a function');
  }

  const newPropType = (...args) => propType(...args);

  newPropType.isRequired = allOfType([
    PropTypes.any.isRequired,
    newPropType,
  ]);

  return newPropType;
};
