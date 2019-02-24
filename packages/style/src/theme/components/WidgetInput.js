import { css } from 'styled-components';

import { mixin } from '../../selectors';

// eslint-disable-next-line import/prefer-default-export
export const component_widgetInput_standard = css`
  ${mixin({ name: 'componentBox' })}

  ${mixin({ name: 'disabled' })};
  ${mixin({ name: 'readOnly' })};
`;
