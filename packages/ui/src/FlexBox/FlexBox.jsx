import styled from 'styled-components';
import PropTypes from 'prop-types';
import { component } from '@gnowth/style';

const UIFlexBox = styled.div`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};

  ${component()}
  ${props => props.css}
`;

UIFlexBox.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  namespace: PropTypes.string,
  variant: PropTypes.string,
};

UIFlexBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  namespace: 'component_uiFlexBox',
  variant: 'standard',
};

export default UIFlexBox;
