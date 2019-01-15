import { color } from '@gnowth/style';
import { css } from 'styled-components';

export const danger = css`
  color: ${color({ name: 'danger' })};
  background-color: ${color({ name: 'danger', weight: '200' })}
`;

export const primary = css`
  color: ${color({ name: 'primary' })};
`;

export const page = css`
  border: 0;
`;

export const page_flat = css`
  border: 0;
  border-radius: 0;
`;
