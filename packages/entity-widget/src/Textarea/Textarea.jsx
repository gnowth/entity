import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withPropsFiltered } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';

const WidgetTextarea = styled(withPropsFiltered('textarea'))`
  width: 100%;

  ${component({ name: 'widgetTextarea' })}
  ${props => props.css}
`;

WidgetTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
};

WidgetTextarea.defaultProps = {
  value: '',
  variant: 'main',
};

export default WidgetTextarea;
