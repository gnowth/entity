import styled from 'styled-components';
import PropTypes from 'prop-types';

import withPropsFiltered from '../withPropsFiltered';

const WidgetInput = styled(withPropsFiltered('input'))`
  width: 100%;

  ${props => props.theme.components?.widgetInput}
  ${props => props.css}
`;

WidgetInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

WidgetInput.defaultProps = {
  value: '',
};

export default WidgetInput;
