import PropTypes from 'prop-types';

import PropTypesPlus from 'lib/prop-types/Plus';

export default PropTypesPlus.allOfType([
  PropTypesPlus.notNull,
  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ]),
]);
