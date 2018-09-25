import styled from 'react-emotion';

import withPropsFiltered from '../withPropsFiltered';

const WidgetInput = styled(withPropsFiltered('input'))`
  ${props => props.theme.components.widgetInput}
`;

export default WidgetInput;
