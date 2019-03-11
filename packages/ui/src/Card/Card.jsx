import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { colorFromPalette, mixin, withEnhanceProps } from '@gnowth/style';

const UICard = withEnhanceProps(styled.div`
  background-color: ${props => colorFromPalette({ paletteAsBackground: !props.paletteAsBackground })(props)};
  color: ${colorFromPalette()};

  ${mixin({ name: 'padding' })}
  ${mixin({ name: 'margin' })}

  ${props => props.css}
`);

UICard.propTypes = {
  css: PropTypesPlus.css,
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,
};

UICard.defaultProps = {
  css: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  namespace: 'component_uiCard',
  variant: 'standard',
};

export default UICard;
