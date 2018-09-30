import PropTypes from 'prop-types';

import ifElse from './if-else';

export default (predicate, propType) => ifElse(
  predicate,
  PropTypes.any,
  propType.isRequired,
);
