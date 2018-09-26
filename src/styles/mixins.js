import { css } from 'styled-components';
import { lighten } from 'polished';

export const button = css`
  border: 1px solid currentColor;
  border-radius: 5px;
  background-color: white;
  padding: 7px 20px;
  cursor: pointer;
  color: ${props => props.theme.vars.colorSecondary};
  min-width: 150px;
  outline: none;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: ${props => props.theme.vars.colorWhite};
    border-color: ${props => lighten(0.1, props.theme.vars.colorSecondary)};
    color: ${props => lighten(0.1, props.theme.vars.colorSecondary)};
  }

  ${props => props.disabled && props.theme.mixins.disabled}
`;

export const buttonSubmit = css`
  ${button}

  background-color: ${props => props.theme.vars.colorPrimary};
  border-color: ${props => props.theme.vars.colorPrimary};
  color: ${props => props.theme.vars.colorWhite};

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.vars.colorPrimary)};
    border-color: ${props => lighten(0.1, props.theme.vars.colorPrimary)};
    color: ${props => props.theme.vars.colorWhite};
  }
`;

export const buttonCancel = css`
  ${button}

  border: 0;
  color: ${props => props.theme.vars.colorPrimary};

  &:hover {
    color: ${props => lighten(0.1, props.theme.vars.colorPrimary)};
  }
`;

export const componentBox = css`
  background-color: hsl(0, 0%, 98%);
  border: 1px solid ${props => props.theme.vars.colorSecondary};
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
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
`;

export const readOnly = css`
  opacity: 0.7;
  cursor: default;
  pointer-events: none;
`;
