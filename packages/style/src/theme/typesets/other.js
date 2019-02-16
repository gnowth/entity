import { css } from 'styled-components';

import { color } from '../../selectors';
import baseCss from './base';

export const component_uiType_label = {
  component: 'label',
  css: css`
    ${baseCss}
  `,
};

export const component_uiType_link = {
  css: css`
    ${baseCss}

    color: ${color({ name: 'primary' })};
    text-decoration: underline;
  `,
};

export const component_uiType_placeholder = {
  css: css`
    ${baseCss}

    color: ${color({ name: 'gray' })};
  `,
};
