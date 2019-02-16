import { css } from 'styled-components';

import { mixin } from '../../selectors';

// eslint-disable-next-line import/prefer-default-export
export const component_widgetCheckbox_main = css`
  ${mixin({ name: 'disabled' })}
  ${mixin({ name: 'readOnly' })}
`;
