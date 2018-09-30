import PropTypes from 'prop-types';

export default PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
});
