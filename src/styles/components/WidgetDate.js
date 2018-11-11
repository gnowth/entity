import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const main = {
  input: css`
    ${props => props.theme.mixins.componentBox}
  `,
};
