import { css } from 'styled-components';

export const text = css`
  color: ${props => props.theme.vars.paletteBlack.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_danger = css`
  color: ${props => props.theme.vars.paletteDanger.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_grey = css`
  color: ${props => props.theme.vars.paletteGrey.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_primary = css`
  color: ${props => props.theme.vars.palettePrimary.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_secondary = css`
  color: ${props => props.theme.vars.palettePrimary.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;

export const text_white = css`
  color: ${props => props.theme.vars.paletteWhite.color('500')};

  ${props => props.disabled && props.theme.mixins.disabled}
  ${props => props.readOnly && props.theme.mixins.readOnly}
`;
