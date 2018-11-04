import { css } from 'styled-components';

import { text } from './text';

export const header = css`
  ${text}

  font-weight: bold;
  text-transform: uppercase;
`;

export const header_primary = css`
  ${header}

  color: ${props => props.theme.vars.colorPrimary};
`;
