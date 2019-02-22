import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { colorFromPalette, component, sizeGridBase } from '@gnowth/style';

const UIWell = styled.div`
  background-color: ${props => colorFromPalette({ asBackground: !props.paletteAsBackground })(props)};
  border: 1px solid currentColor;
  border-radius: calc(${sizeGridBase} * ${props => props.ratio} * 0.5);
  color: ${colorFromPalette()};
  padding: calc(${sizeGridBase} * ${props => props.ratio} * 2);

  ${component()}
  ${props => props.css}
`;

UIWell.propTypes = {
  css: PropTypesPlus.css,
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  ratio: PropTypes.number,
  variant: PropTypes.string,
};

UIWell.defaultProps = {
  css: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  namespace: 'component_uiWell',
  variant: 'standard',
  ratio: 1,
};

export default UIWell;
