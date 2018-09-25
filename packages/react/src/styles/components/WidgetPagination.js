import { css } from 'styled-components';
import { lighten } from 'polished';

export default {
  navigation: css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1.5px 3px 0 rgba(0, 0, 0, 0.2);
    height: 50px;
    background-color: ${props => props.theme.vars.colorWhite};
  `,

  pageFirst: css`
    display: none;
  `,

  pagePrevious: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(50% - 250px);
    border: 1px solid ${props => props.theme.vars.colorPrimary};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${props => lighten(0.1, props.theme.vars.colorPrimary)};
    }
  `,

  pageNext: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(50% - 250px);
    border: 1px solid ${props => props.theme.vars.colorPrimary};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${props => lighten(0.1, props.theme.vars.colorPrimary)};
    }
  `,

  pageLast: css`
    display: none;
  `,
};
