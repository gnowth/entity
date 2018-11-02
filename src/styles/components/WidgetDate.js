import { css } from 'styled-components';

export default {
  input: css`
    ${props => props.theme.mixins.componentBox}
  `,
};
