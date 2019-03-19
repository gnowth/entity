import _ from 'lodash';

import scale from '../selectors/scale';

export default configs => (props) => {
  const value = props[configs.prop];

  if (_.isString(value)) {
    return { [configs.css]: value };
  }

  if (_.isString(configs.scale) && _.isInteger(value)) {
    return {
      [configs.css]: value >= 0
        ? scale({ index: value, name: configs.scale })(props)
        : `-${scale({ index: -value, name: configs.scale })(props)}`,
    };
  }

  if (Array.isArray(configs.scale) && _.isInteger(value)) {
    return {
      [configs.css]: value >= 0
        ? configs.scale[value]
        : `-${configs.scale[-value]}`,
    };
  }

  if (_.isFunction(configs.scale) && _.isNumber(value)) {
    return { [configs.css]: configs.scale(value) };
  }

  return {};
};
