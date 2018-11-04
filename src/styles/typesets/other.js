import { css } from 'styled-components';

import { text } from './text';

export const label = css`
  ${text}
`;

export const link = css`
  ${text}

  color: ${props => props.theme.vars.colorPrimary};
  text-decoration: underline;
`;

export const placeholder = css`
  ${text}

  color: ${props => props.theme.vars.colorGrey};
`;
