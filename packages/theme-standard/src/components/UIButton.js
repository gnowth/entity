import { color, colorFromPalette, boxshadow } from '@burnsred/theme';
import { css } from 'styled-components';

export const component_uiButton_contained = {
  contentPaletteAsBackground: true,
  iconPaletteAsBackground: true,
  processingPaletteAsBackground: true,
  css: css`
    background-color: ${colorFromPalette()};
    min-width: 8rem;

    &:hover {
      background-color: ${props => colorFromPalette({ paletteWeight: '400' })(props)};
    }

    &:focus {
      background-color: ${colorFromPalette({ paletteWeight: '700' })};
    }

    &:disabled {
      background-color: ${color({ palette: 'gray', paletteWeight: '200' })};
      cursor: auto;

      * {
        color: ${color({ palette: 'gray', paletteWeight: '800' })};
      }
    }
  `,
};

export const component_uiButton_fab = {
  contentHidden: true,
  contentPaletteAsBackground: true,
  iconHidden: false,
  iconPaletteAsBackground: true,
  processingPaletteAsBackground: true,
  css: css`
    ${boxshadow({ name: 'materialHover3' })};
    background-color: ${colorFromPalette()};
    border-radius: 50%;
    padding: 0;
    height: 3em;
    width: 3em;

    &:hover {
      background-color: ${colorFromPalette({ paletteWeight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ paletteWeight: '700' })};
    }

    &:disabled {
      background-color: ${color({ palette: 'gray', paletteWeight: '200' })};
      cursor: auto;

      * {
        color: ${color({ palette: 'gray', paletteWeight: '800' })};
      }
    }
  `,
};

export const component_uiButton_flat = {
  contentPaletteAsBackground: true,
  iconPaletteAsBackground: true,
  processingPaletteAsBackground: true,
  css: css`
    background-color: ${colorFromPalette()};
    border-radius: 0;

    &:hover {
      background-color: ${colorFromPalette({ paletteWeight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ paletteWeight: '700' })};
    }

    &:disabled {
      background-color: ${color({ palette: 'gray', paletteWeight: '200' })};
      cursor: auto;

      * {
        color: ${color({ palette: 'gray', paletteWeight: '800' })};
      }
    }
  `,
};

export const component_uiButton_icon = {
  contentHidden: true,
  iconHidden: false,
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

export const component_uiButton_navigation = {
  css: css`
    border-radius: 0;

    &.active {
      border-bottom: 2px solid ${colorFromPalette()};
    }
  `,
};

export const component_uiButton_outlined = {
  css: css`
    border: 1px solid ${color({ palette: 'gray', paletteWeight: '200' })};

    &:hover {
      background-color: ${color({ palette: 'gray', paletteWeight: '50' })};
    }

    &:disabled {
      background-color: ${color({ palette: 'white' })};
      border-color: ${color({ palette: 'gray', paletteWeight: '800' })};
      cursor: auto;

      * {
        color: ${color({ palette: 'gray', paletteWeight: '400' })};
      }
    }
  `,
};

export const component_uiButton_raised = {
  contentPaletteAsBackground: true,
  iconPaletteAsBackground: true,
  processingPaletteAsBackground: true,
  css: css`
    ${boxshadow({ name: 'material2' })};
    background-color: ${colorFromPalette()};

    &:hover {
      background-color: ${colorFromPalette({ paletteWeight: '400' })};
    }

    &:focus {
      background-color: ${colorFromPalette({ paletteWeight: '700' })};
    }

    &:disabled {
      background-color: ${color({ palette: 'gray', paletteWeight: '200' })};
      cursor: auto;

      * {
        color: ${color({ palette: 'gray', paletteWeight: '800' })};
      }
    }
  `,
};

export const component_uiButton_text = {};
