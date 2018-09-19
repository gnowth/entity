import PropTypes from 'prop-types';

export default {
  locale: PropTypes.shape({
    defaultMessage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
