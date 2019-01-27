import { color } from '@gnowth/style';
import { css } from 'styled-components';

export const contained = css`
  color: blue;
`;

export const outlined = css`
  border: 1px solid currentColor;
  border-radius: 3px;
  color: ${color({ name: 'primary' })};
  cursor: pointer;
  padding: 5px 30px;
`;

export const text = css`
  color: ${color({ name: 'black' })};
  text-decoration: none;
`;

export const toggle = css`
  color: blue;
`;
