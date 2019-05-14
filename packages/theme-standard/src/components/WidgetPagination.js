import { color } from '@burnsred/theme';
import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const component_widgetPagination_standard = {
  navigation: css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1.5px 3px 0 rgba(0, 0, 0, 0.2);
    height: 50px;
    background-color: ${color({ palette: 'white' })};
  `,

  pageFirst: css`
    display: none;
  `,

  pagePrevious: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(50% - 250px);
    border: 1px solid ${color({ palette: 'primary' })};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${color({ palette: 'primary', paletteWeight: '400' })};
    }
  `,

  pageNext: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(50% - 250px);
    border: 1px solid ${color({ palette: 'primary' })};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${color({ palette: 'primary', paletteWeight: '400' })};
    }
  `,

  pageLast: css`
    display: none;
  `,
};
