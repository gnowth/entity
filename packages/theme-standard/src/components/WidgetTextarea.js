import { mixins } from '@burnsred/theme';
import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const component_widgetTextarea_standard = {
  css: css`
    ${mixins.borderInput}
    height: 100px;
    resize: none;
  `,
};
