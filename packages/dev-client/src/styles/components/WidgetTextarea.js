import { mixin } from '@gnowth/style';
import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const main = css`
  ${mixin({ name: 'componentBox' })}
  height: 100px;
  resize: none;

  ${mixin({ name: 'disabled' })};
  ${mixin({ name: 'readOnly' })};
`;