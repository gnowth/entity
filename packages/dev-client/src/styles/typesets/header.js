import { color } from '@gnowth/style';
import { css } from 'styled-components';

import baseCss from './base';

const baseHeader = css`
  ${baseCss}

  font-family: Helvetica, Sans-Serif;
  opacity: 0.87;
`;

export const header = {
  component: 'h1',
  root: css`
    ${baseHeader}
  `,
};

export const header_primary = {
  component: 'h1',
  root: css`
    ${baseHeader}

    color: ${color({ name: 'primary' })};
  `,
};
