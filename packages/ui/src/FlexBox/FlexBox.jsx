import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { component, colorFromPalette, mixin } from '@gnowth/style';

const UIFlexBox = styled.div`
  align-items: ${props => props.alignItems};
  display: flex;
  justify-content: ${props => props.justifyContent};

  ${props => props.palette && css`
    background-color: ${colorFromPalette()(props)};
  `}

  ${props => props.flexDirection && css`
    flex-direction: ${props.flexDirection};
  `}

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}

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
  namespace: 'component_uiFlexBox',
  variant: 'standard',
};

export default UIFlexBox;
