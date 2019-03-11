import { css } from 'styled-components';

import { color } from '../selectors';

export const mixin_button = css`
  border: 1px solid currentColor;
  border-radius: 5px;
  background-color: white;
  padding: 7px 20px;
  cursor: pointer;
  color: ${color({ palette: 'secondary' })};
  min-width: 150px;
  outline: none;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: ${color({ palette: 'white' })};
    border-color: ${color({ palette: 'secondary', paletteWeight: '400' })};
    color: ${color({ palette: 'secondary', paletteWeight: '400' })};
  }
`;

export const mixin_buttonSubmit = css`
  ${mixin_button}

  background-color: ${color({ palette: 'primary' })};
  border-color: ${color({ palette: 'primary' })};
  color: ${color({ palette: 'white' })};

  &:hover {
    background-color: ${color({ palette: 'primary', paletteWeight: '400' })};
    border-color: ${color({ palette: 'primary', paletteWeight: '400' })};
    color: ${color({ palette: 'white' })};
  }
`;

export const mixin_buttonCancel = css`
  ${mixin_button}

  border: 0;
  color: ${color({ palette: 'primary' })};

  &:hover {
    color: ${color({ palette: 'primary', paletteWeight: '400' })};
  }
`;

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
