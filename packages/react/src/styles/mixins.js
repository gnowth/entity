import { css } from 'react-emotion';
import { lighten } from 'polished';

export const button = props => css`
  border: 1px solid currentColor;
  border-radius: 5px;
  background-color: white;
  padding: 7px 20px;
  cursor: pointer;
  color: ${props.theme.vars.colorSecondary};
  min-width: 150px;
  outline: none;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: ${props.theme.vars.colorWhite};
    border-color: ${lighten(0.1, props.theme.vars.colorSecondary)};
    color: ${lighten(0.1, props.theme.vars.colorSecondary)};
  }

  ${props.disabled && props.theme.mixins.disabled}
`;

export const buttonSubmit = props => css`
  ${button(props)}

  background-color: ${props.theme.vars.colorPrimary};
  border-color: ${props.theme.vars.colorPrimary};
  color: ${props.theme.vars.colorWhite};

  &:hover {
    background-color: ${lighten(0.1, props.theme.vars.colorPrimary)};
    border-color: ${lighten(0.1, props.theme.vars.colorPrimary)};
    color: ${props.theme.vars.colorWhite};
  }
`;

export const buttonCancel = props => css`
  ${button(props)}

  border: 0;
  color: ${props.theme.vars.colorPrimary};

  &:hover {
    color: ${lighten(0.1, props.theme.vars.colorPrimary)};
  }
`;

export const componentBox = props => css`
  border: 1px solid ${props.theme.vars.colorSecondary};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;

  &:focus {
    border-color: ${props.theme.vars.colorSecondary};
    outline: none;
    box-shadow: none;
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
