import { color } from '@gnowth/style';
import { css } from 'styled-components';

import baseCss from './base';

export const label = {
  component: 'label',
  root: css`
    ${baseCss}
  `,
};

export const link = {
  root: css`
    ${baseCss}

    color: ${color({ name: 'primary' })};
    text-decoration: underline;
  `,
};

export const placeholder = {
  root: css`
    ${baseCss}

    color: ${color({ name: 'gray' })};
  `,
};
