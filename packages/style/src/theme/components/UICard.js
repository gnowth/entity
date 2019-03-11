import { css } from 'styled-components';

import { boxshadow, color, variable } from '../../selectors';

export const component_uiCard_danger = {
  css: css`
    color: ${color({ palette: 'danger' })};
    background-color: ${color({ palette: 'danger', paletteWeight: '50' })}
  `,
};

export const component_uiCard_page = {
  css: css`
    background-color: ${color({ palette: 'gray', paletteWeight: '400' })};
    border: 0;
    margin: auto;
    max-width: ${variable({ name: 'size', variant: 'pageMaxWidth' })};
  `,
};

export const component_uiCard_page_flat = {
  css: css`
    border: 0;
    border-radius: 0;
  `,
};

export const component_uiCard_panel = {
  css: css`
    ${boxshadow({ name: 'material1' })}
    border: 0;
    border-bottom: 0.25rem solid ${color({ palette: 'secondary' })};
  `,
};

export const component_uiCard_panel_focused = {
  css: css`
    ${boxshadow({ name: 'material1' })}
    background-color: ${color({ palette: 'gray', paletteWeight: '100' })};
    border: 0;
    border-bottom: 0.25rem solid ${color({ palette: 'secondary' })};
  `,
};
