import _ from 'lodash';

import isRequired from './is-required';

export default predicate => (value, configs) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_.isFunction(predicate)) throw new Error('validators.isRequiredIf: predicate argument must be of type function');
  }

  return predicate({ value, ...configs }) && isRequired(value, configs);
};
