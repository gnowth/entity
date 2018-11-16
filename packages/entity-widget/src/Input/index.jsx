import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withPropsFiltered } from '@gnowth/higher-order-component';

const WidgetInput = styled(withPropsFiltered('input'))`
  width: 100%;

  ${props => props.theme.components?.widgetInput?.[props.variant]}
  ${props => props.css}
`;

WidgetInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
};

WidgetInput.defaultProps = {
  value: '',
  variant: 'main',
};

export default WidgetInput;
