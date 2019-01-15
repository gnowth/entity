import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { color, component, sizeGridBase } from '@gnowth/style';

const UIWell = styled.div`
  background-color: ${color({ name: 'white' })};
  border: 1px solid currentColor;
  border-radius: calc(${sizeGridBase} * ${props => props.ratio} * 0.5);
  color: ${color({ name: 'black' })};
  padding: calc(${sizeGridBase} * ${props => props.ratio} * 2);

  ${component({ name: 'uiWell' })}
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
