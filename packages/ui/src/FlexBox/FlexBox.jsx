import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { component, colorFromPalette } from '@gnowth/style';

const UIFlexBox = styled.div`
  align-items: ${props => props.alignItems};
  display: flex;
  justify-content: ${props => props.justifyContent};

  ${props => props.palette && css`
    background-color: ${colorFromPalette()(props)};
  `}

  ${props => props.margin && css`
    margin: ${props.margin};
  `}

  ${props => props.padding && css`
    padding: ${props.padding};
  `}

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
