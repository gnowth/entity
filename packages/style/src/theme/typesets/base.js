import { css } from 'styled-components';

import { color } from '../../selectors';

export default css`
  color: ${color({ name: 'black' })};
  font-family: Arial, Sans-Serif;
  font-size: 1rem;
  margin: 0;
  opacity: 0.6;
  padding: 0;
`;
