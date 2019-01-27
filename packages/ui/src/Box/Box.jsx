import styled from 'styled-components';
import PropTypes from 'prop-types';
import { component } from '@gnowth/style';

const UIBox = styled.div`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};

  ${component({ name: 'uiBox' })}
  ${props => props.css}
`;

UIBox.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  variant: PropTypes.string,
};

UIBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  variant: 'main',
};

export default UIBox;
