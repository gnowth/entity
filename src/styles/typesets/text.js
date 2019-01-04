import { css } from 'styled-components';

import baseCss from './base';

export const text = {
  css: css`
    ${baseCss}

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};

export const text_danger = {
  css: css`
    ${baseCss}
    color: ${props => props.theme.vars.colorDanger};

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};

export const text_grey = {
  css: css`
    ${baseCss}
    color: ${props => props.theme.vars.colorGrey};

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};

export const text_primary = {
  css: css`
    ${baseCss}
    color: ${props => props.theme.vars.colorPrimary};

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};

export const text_secondary = {
  css: css`
    ${baseCss}
    color: ${props => props.theme.vars.colorSecondary};

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};

export const text_white = {
  css: css`
    ${baseCss}
    color: ${props => props.theme.vars.colorWhite};

    ${props => props.disabled && props.theme.mixins.disabled}
    ${props => props.readOnly && props.theme.mixins.readOnly}
  `,
};
