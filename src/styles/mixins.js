import { color, mixin } from '@gnowth/style';
import { css } from 'styled-components';

export const button = css`
  border: 1px solid currentColor;
  border-radius: 5px;
  background-color: white;
  padding: 7px 20px;
  cursor: pointer;
  color: ${color({ name: 'secondary' })};
  min-width: 150px;
  outline: none;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: ${color({ name: 'white' })};
    border-color: ${color({ name: 'secondary', weight: '400' })};
    color: ${color({ name: 'secondary', weight: '400' })};
  }

  ${mixin({ name: 'disabled' })}
`;

export const buttonSubmit = css`
  ${button}

  background-color: ${color({ name: 'primary' })};
  border-color: ${color({ name: 'primary' })};
  color: ${color({ name: 'white' })};

  &:hover {
    background-color: ${color({ name: 'primary', weight: '400' })};
    border-color: ${color({ name: 'primary', weight: '400' })};
    color: ${color({ name: 'white' })};
  }
`;

export const buttonCancel = css`
  ${button}

  border: 0;
  color: ${color({ name: 'primary' })};

  &:hover {
    color: ${color({ name: 'primary', weight: '400' })};
  }
`;

export const componentBox = css`
  background-color: hsl(0, 0%, 98%);
  border: 1px solid ${color({ name: 'secondary' })};
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

export const disabled = css`
  ${props => props.disabled && css`
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  `}
`;

export const readOnly = css`
  ${props => props.readOnly && css`
    opacity: 0.7;
    cursor: default;
    pointer-events: none;
  `}
`;
