import PropTypes from 'prop-types';

export default PropTypes.exact({
  defaultMessage: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
});
