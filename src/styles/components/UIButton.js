import { css } from 'styled-components';

export const contained = css`
  color: blue;
`;

export const outlined = css`
  border: 1px solid currentColor;
  border-radius: 3px;
  color: ${props => props.theme.vars.colorPrimary};
  cursor: pointer;
  padding: 5px 30px;
`;

export const text = css`
  color: blue;
`;

export const toggle = css`
  color: blue;
`;
