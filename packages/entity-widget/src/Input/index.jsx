import styled from 'react-emotion';

import { withPropsFiltered } from '../utils';

const WidgetInput = styled(withPropsFiltered('input'))`
  ${props => props.theme.components.widgetInput}
`;

export default WidgetInput;
