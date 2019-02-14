import styled from 'styled-components';
import { color, component } from '@gnowth/style';

const Overlay = styled.div`
  background-color: ${color({ name: 'white' })};
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;

  ${component({ name: 'uiPopup_Overlay' })}
`;

export default Overlay;
