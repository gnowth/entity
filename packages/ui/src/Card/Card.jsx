import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withPropsFiltered } from '@gnowth/higher-order-component';
import { colorFromPalette, component, sizeGridBase } from '@gnowth/style';

const UICard = styled.div`
  background-color: ${props => colorFromPalette({ asBackground: !props.paletteAsBackground })(props)};
  border: 1px solid currentColor;
  border-radius: calc(${sizeGridBase} * ${props => props.ratio} * 0.5);
  color: ${colorFromPalette()};
  padding: calc(${sizeGridBase} * ${props => props.ratio} * 2);

  ${component({ branch: 'css' })}
  ${props => props.css}
`;

UICard.propTypes = {
  css: PropTypesPlus.css,
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  ratio: PropTypes.number,
  variant: PropTypes.string,
};

UICard.defaultProps = {
  css: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  namespace: 'component_uiCard',
  variant: 'standard',
  ratio: 1,
};

export default withPropsFiltered(UICard);
