import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

import withRequired from './with-required';

export default (predicate, propTypeTrue, propTypeFalse = PropTypes.any) => withRequired(
  (...args) => {
    const computedPredicate = _isFunction(predicate)
      ? predicate(...args)
      : args[0][predicate];

    return computedPredicate
      ? propTypeTrue(...args)
      : propTypeFalse(...args);
  },
);
