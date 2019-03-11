import { css } from 'styled-components';
import { color } from '../selectors';

export default css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${color({ name: 'gray', weight: '400' })};
    font-family: Arial, Sans-Serif;
  }

  h1, h2, h3, h4, h5, h6, label, p, pre, span  {
    margin: 0;
    padding: 0;
  }
`;
