import PropTypes from 'prop-types';

export default (propTypes = []) => {
  const propType = (...rest) => {
    const failedPropType = propTypes.find(p => p(...rest));

    return failedPropType?.(...rest);
  };

  propType.isRequired = (...rest) => {
    const failedPropType = [PropTypes.any.isRequired].concat(propTypes).find(p => p(...rest));

    return failedPropType?.(...rest);
  };

  return propType;
};
