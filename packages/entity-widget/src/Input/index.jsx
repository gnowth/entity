import styled from 'react-emotion';

import { withPropsFiltered } from '../utils';

const WidgetInput = styled.input`
  ${props => props.theme.components.widgetInput}
`;

export default withPropsFiltered(WidgetInput);
