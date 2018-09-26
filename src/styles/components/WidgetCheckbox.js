import { css } from 'styled-components';

export default css`
  display: block;
  cursor: pointer;

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;
