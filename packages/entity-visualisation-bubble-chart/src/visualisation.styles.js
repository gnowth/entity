import { css } from 'styled-components';
import { boxshadow, mixins } from '@burnsred/theme';

export default {
  bubble_tooltip: css`
    background: white;
    border: 0px;
    pointer-events: none;
    ${mixins.padding}
    ${boxshadow({ name: 'material1' })}
    border-radius: 8px;

    position: fixed;
    top: ${props => (props.itemPositionY || 0)}px;
    left: ${props => props.itemPositionX || 0}px;
    transform: translate(-50%, 10px);

    &:after {
      border: solid transparent;
      border-color: rgba(136, 183, 213, 0);
      border-bottom-color: white;
      border-width: 10px;
      content: " ";
      height: 0;
      left: 50%;
      margin-left: -10px;
      pointer-events: none;
      position: absolute;
      bottom: 100%;
      width: 0;
    }
  `,
};
