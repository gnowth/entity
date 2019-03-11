import { css } from 'styled-components';

import { boxshadow, color, sizeGridBase, variable } from '../../selectors';

export const component_uiCard_danger = {
  css: css`
    background-color: ${color({ palette: 'danger', paletteWeight: '50' })};
    border: 1px solid currentColor;
    border-radius: calc(${sizeGridBase} * 0.5);
    color: ${color({ palette: 'danger' })};
  `,
  padding: '1rem',
};

export const component_uiCard_page = {
  css: css`
    background-color: ${color({ palette: 'gray', paletteWeight: '400' })};
    margin: auto;
    max-width: ${variable({ name: 'size', variant: 'pageMaxWidth' })};
  `,
  padding: '1rem',
};

export const component_uiCard_page_flat = {
  padding: '1.5rem',
};

export const component_uiCard_panel = {
  css: css`
    ${boxshadow({ name: 'material1' })}
    border-bottom: 0.25rem solid ${color({ palette: 'secondary' })};
  `,
  padding: '1rem',
};

export const component_uiCard_panel_focused = {
  css: css`
    ${boxshadow({ name: 'material1' })}
    background-color: ${color({ palette: 'gray', paletteWeight: '100' })};
    border-bottom: 0.25rem solid ${color({ palette: 'secondary' })};
  `,
  padding: '1rem',
};

export const component_uiCard_screen = {
  padding: '1rem',
};
