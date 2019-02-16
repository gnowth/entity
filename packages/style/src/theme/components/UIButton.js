import { css } from 'styled-components';

import { color } from '../../selectors';

export const component_uiButton_contained = css`
  color: blue;
`;

export const component_uiButton_outlined = css`
  border: 1px solid currentColor;
  border-radius: 3px;
  color: ${color({ name: 'primary' })};
  cursor: pointer;
  padding: 5px 30px;
`;

export const component_uiButton_text = css`
  color: ${color({ name: 'black' })};
  text-decoration: none;
`;

export const component_uiButton_toggle = css`
  color: blue;
`;

// export const component_uiButton_contained = {

// };

export const component_uiButton_fab = {

};

export const component_uiButton_icon = {

};

// export const component_uiButton_outlined = {

// };

// export const component_uiButton_text = {
//   css: css`
//     border: 0;
//   `,
// };

// export const component_uiButton_toggle = {

// };

export const component_uiButton_raised = {

};
