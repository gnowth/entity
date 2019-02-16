import { css } from 'styled-components';

import { mixin } from '../../selectors';

// eslint-disable-next-line import/prefer-default-export
export const component_widgetDate_main = {
  input: css`
    ${mixin({ name: 'componentBox' })}
  `,
};
