import { css } from 'styled-components';

export const text = css`
  color: ${props => props.theme.vars.colorBlack};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_danger = css`
  color: ${props => props.theme.vars.colorDanger};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_grey = css`
  color: ${props => props.theme.vars.colorGrey};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_primary = css`
  color: ${props => props.theme.vars.colorPrimary};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_secondary = css`
  color: ${props => props.theme.vars.colorSecondary};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_white = css`
  color: ${props => props.theme.vars.colorWhite};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;
