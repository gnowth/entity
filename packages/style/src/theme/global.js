import { css } from 'styled-components';
import { color } from '../selectors';

export default css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${color({ name: 'gray', weight: '100' })};
    font-family: Arial, Sans-Serif;
  }
`;
