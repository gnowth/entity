import { css } from 'styled-components';

import baseCss from './base';

export const label = {
  component: 'label',
  css: css`
    ${baseCss}
  `,
};

export const link = {
  css: css`
    ${baseCss}

    color: ${props => props.theme.vars.colorPrimary};
    text-decoration: underline;
  `,
};

export const placeholder = {
  css: css`
    ${baseCss}

    color: ${props => props.theme.vars.colorGrey};
  `,
};
