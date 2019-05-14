import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withPropsFiltered } from '@burnsred/higher-order-component';
import { component } from '@burnsred/theme';

const WidgetTextarea = styled(withPropsFiltered('textarea'))`
  width: 100%;

  ${component({ branch: 'css' })}
  ${props => props.css}
`;

WidgetTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
};

WidgetTextarea.defaultProps = {
  namespace: 'component_widgetTextarea',
  value: '',
  variant: 'standard',
};

export default WidgetTextarea;
