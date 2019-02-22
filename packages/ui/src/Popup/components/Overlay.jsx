import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, component } from '@gnowth/style';

const Overlay = styled.div`
  background-color: ${color({ name: 'white' })};
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;

  ${component()}
`;

Overlay.propTypes = {
  namespace: PropTypes.string,
  variant: PropTypes.string,
};

Overlay.defaultProps = {
  namespace: 'component_uiPopup_Overlay',
  variant: 'standard',
};

export default Overlay;
