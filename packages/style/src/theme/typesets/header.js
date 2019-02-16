import { css } from 'styled-components';

import { color } from '../../selectors';
import baseCss from './base';

const baseHeader = css`
  ${baseCss}

  font-family: Helvetica, Sans-Serif;
  opacity: 0.87;
`;

export const component_uiType_header = {
  component: 'h1',
  css: css`
    ${baseHeader}
  `,
};

export const component_uiType_header_primary = {
  component: 'h1',
  css: css`
    ${baseHeader}

    color: ${color({ name: 'primary' })};
  `,
};
