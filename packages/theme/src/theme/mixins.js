import { css } from 'styled-components';

import { color } from '../selectors';

export const mixin_componentBox = css`
  background-color: hsl(0, 0%, 98%);
  border: 1px solid ${color({ palette: 'secondary' })};
  border-radius: 4px;
  padding: 9px;
  width: 100%;

  &:focus {
    background-color: white;
    border-color: #2684ff;
    outline: none;
    box-shadow: 0 0 0 1px #2684ff;
  }
`;

export const mixin_margin = css`
  ${props => props.$margin && css`
    margin: ${props.$margin};
   `}
 `;

export const mixin_padding = css`
  ${props => props.$padding && css`
    padding: ${props.$padding};
  `}
`;
