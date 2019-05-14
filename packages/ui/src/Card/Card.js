import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import { colorFromPalette, mixins, withEnhanceProps } from '@burnsred/theme';

const UICard = withEnhanceProps(styled.div`
  background-color: ${props => props.$palette && colorFromPalette({ paletteAsBackground: props.$paletteAsBackground !== undefined && !props.$paletteAsBackground })(props)};

  ${mixins.space}

  ${props => props.css}
`);

UICard.propTypes = {
  css: PropTypesPlus.css,
  margin: PropTypesPlus.string,
  namespace: PropTypesPlus.string,
  padding: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,
};

UICard.defaultProps = {
  css: undefined,
  margin: undefined,
  padding: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  namespace: 'component_uiCard',
  variant: 'standard',
};

export default UICard;
