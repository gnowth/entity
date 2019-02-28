import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import locale from './locale';

export default PropTypes.oneOfType([
  locale,
  PropTypes.string,
  PropTypesImmutable.map,
]);
