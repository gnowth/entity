import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colorFromPalette, mixins, withEnhanceProps } from '@burnsred/theme';

const UIFlexBox = withEnhanceProps(styled.div`
  align-items: ${props => props.alignItems};
  display: flex;

  ${props => props.$palette && css`
    background-color: ${colorFromPalette({ paletteAsBackground: props.$paletteAsBackground !== undefined && !props.$paletteAsBackground })(props)};
  `}

  ${props => props.flexDirection && css`
    flex-direction: ${props.flexDirection};
  `}

  ${props => props.justifyContent && css`
    justify-content: ${props.justifyContent};
  `}

  ${mixins.space}
  ${props => props.css}
`);

UIFlexBox.propTypes = {
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  namespace: PropTypes.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,
};

UIFlexBox.defaultProps = {
  alignItems: 'center',
  namespace: 'component_uiFlexBox',
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  variant: 'standard',
};

export default UIFlexBox;
