import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';

const UIWell = styled.div`
  background-color: ${props => props.theme.vars.colorWhite};
  border: 1px solid currentColor;
  border-radius: calc(${props => props.theme.vars.gridSize} * ${props => props.ratio} * 0.5);
  color: ${props => props.theme.vars.colorBlack};
  padding: calc(${props => props.theme.vars.gridSize} * ${props => props.ratio} * 2);

  ${props => props.theme.components?.uiWell?.[props.variant]}
  ${props => props.css}
`;

UIWell.propTypes = {
  css: PropTypesPlus.css,
  ratio: PropTypes.number,
  variant: PropTypes.string,
};

UIWell.defaultProps = {
  css: undefined,
  variant: 'main',
  ratio: 1,
};

export default UIWell;
