import _ from 'lodash';

export default {
  mergeProps: (mergeMap = {}, themeProps = {}, componentProps = {}) => _.mapValues(
    mergeMap,
    (value, key) => value(themeProps[key], componentProps[key]),
  ),
};
