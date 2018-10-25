import styled from 'styled-components';
import PropTypes from 'prop-types';

import withPropsFiltered from '../withPropsFiltered';

const WidgetTextarea = styled(withPropsFiltered('textarea'))`
  width: 100%;

  ${props => props.theme.components?.widgetTextarea}
  ${props => props.css}
`;

WidgetTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

WidgetTextarea.defaultProps = {
  value: '',
};

export default WidgetTextarea;
