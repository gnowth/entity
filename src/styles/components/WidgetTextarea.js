import { css } from 'styled-components';

export default css`
  ${props => props.theme.mixins.componentBox}
  height: 100px;
  resize: none;

  ${props => props.disabled && props.theme.mixins.disabled};
  ${props => props.readOnly && props.theme.mixins.readOnly};
  pointer-events: auto;
`;
