import { css } from 'styled-components';

import { color } from '../../selectors';

export const component_uiWell_danger = css`
  color: ${color({ name: 'danger' })};
  background-color: ${color({ name: 'danger', weight: '50' })}
`;

export const component_uiWell_primary = css`
  color: ${color({ name: 'primary' })};
`;

export const component_uiWell_page = css`
  border: 0;
`;

export const component_uiWell_page_flat = css`
  border: 0;
  border-radius: 0;
`;
