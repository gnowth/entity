import _isFunction from 'lodash/isFunction';
import _isInteger from 'lodash/isInteger';
import _isNumber from 'lodash/isNumber';
import _isString from 'lodash/isString';

import scale from '../selectors/scale';

export default configs => (props) => {
  const value = props[configs.prop];

  if (_isString(value)) {
    return { [configs.css]: value };
  }

  if (_isString(configs.scale) && _isInteger(value)) {
    return {
      [configs.css]: value >= 0
        ? scale({ index: value, name: configs.scale })(props)
        : `-${scale({ index: -value, name: configs.scale })(props)}`,
    };
  }

  if (Array.isArray(configs.scale) && _isInteger(value)) {
    return {
      [configs.css]: value >= 0
        ? configs.scale[value]
        : `-${configs.scale[-value]}`,
    };
  }

  if (_isFunction(configs.scale) && _isNumber(value)) {
    return { [configs.css]: configs.scale(value) };
  }

  return {};
};
