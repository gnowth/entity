import styled from 'styled-components';

import withPropsFiltered from '../withPropsFiltered';

const WidgetInput = styled(withPropsFiltered('input'))`
  ${props => props.theme.components.widgetInput}
  ${props => props.css}
`;

export default WidgetInput;
