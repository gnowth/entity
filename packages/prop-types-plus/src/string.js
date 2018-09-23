import PropTypes from 'prop-types';

import allOfType from './all-of-type';
import notNull from './not-null';

export default allOfType([
  notNull,
  PropTypes.string,
]);
