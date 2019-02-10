import styled from 'styled-components';
import { component } from '@gnowth/style';

const Overlay = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;

  ${component({ name: 'uiPopup_Overlay' })}
`;

export default Overlay;
