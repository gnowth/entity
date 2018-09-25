import { css } from 'react-emotion';
import { lighten } from 'polished';

export default {
  navigation: props => css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1.5px 3px 0 rgba(0, 0, 0, 0.2);
    height: 50px;
    background-color: ${props.theme.vars.colorWhite};
  `,

  pageFirst: css`
    display: none;
  `,

  pagePrevious: props => css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(50% - 250px);
    border: 1px solid ${props.theme.vars.colorPrimary};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${lighten(0.1, props.theme.vars.colorPrimary)};
    }
  `,

  pageNext: props => css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(50% - 250px);
    border: 1px solid ${props.theme.vars.colorPrimary};
    height: 50px;
    width: 75px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      border-color: ${lighten(0.1, props.theme.vars.colorPrimary)};
    }
  `,

  pageLast: css`
    display: none;
  `,
};
