import { css } from 'styled-components';

import { color, colorFromPalette, boxshadow } from '../../selectors';

export const component_uiButton_contained = {
  contentComponentPaletteAsBackground: true,
  iconComponentPaletteAsBackground: true,
  processingComponentPaletteAsBackground: true,
  css: css`
    background-color: ${colorFromPalette()};

    &:hover {
      background-color: ${colorFromPalette({ weight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ weight: '700' })};
    }

    &:disabled {
      background-color: ${color({ name: 'gray', weight: '200' })};
      cursor: auto;

      * {
        color: ${color({ name: 'gray', weight: '800' })};
      }
    }
  `,
};

export const component_uiButton_fab = {
  contentComponentHidden: true,
  contentComponentPaletteAsBackground: true,
  iconComponentHidden: false,
  iconComponentPaletteAsBackground: true,
  processingComponentPaletteAsBackground: true,
  css: css`
    ${boxshadow({ name: 'materialHover3' })};
    background-color: ${colorFromPalette()};
    border-radius: 50%;
    padding: 0;
    height: 3em;
    width: 3em;

    &:hover {
      background-color: ${colorFromPalette({ weight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ weight: '700' })};
    }

    &:disabled {
      background-color: ${color({ name: 'gray', weight: '200' })};
      cursor: auto;

      * {
        color: ${color({ name: 'gray', weight: '800' })};
      }
    }
  `,
};

export const component_uiButton_icon = {
  contentComponentHidden: true,
  iconComponentHidden: false,
  css: css`
    border-radius: 50%;
    padding: 0.5em;

    ${props => props.media && css`
      @media screen and ${props.media} {
        padding: 0.5em;
      }
    `}
  `,
};

export const component_uiButton_outlined = {
  css: css`
    border: 1px solid ${color({ name: 'gray', weight: '200' })};

    &:hover {
      background-color: ${color({ name: 'gray', weight: '50' })};
    }

    &:disabled {
      background-color: ${color({ name: 'white' })};
      border-color: ${color({ name: 'gray', weight: '800' })};
      cursor: auto;

      * {
        color: ${color({ name: 'gray', weight: '400' })};
      }
    }
  `,
};

export const component_uiButton_raised = {
  contentComponentPaletteAsBackground: true,
  iconComponentPaletteAsBackground: true,
  processingComponentPaletteAsBackground: true,
  css: css`
    ${boxshadow({ name: 'material2' })};
    background-color: ${colorFromPalette()};

    &:hover {
      background-color: ${colorFromPalette({ weight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ weight: '700' })};
    }

    &:disabled {
      background-color: ${color({ name: 'gray', weight: '200' })};
      cursor: auto;

      * {
        color: ${color({ name: 'gray', weight: '800' })};
      }
    }
  `,
};
