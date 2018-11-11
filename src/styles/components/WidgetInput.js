import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const main = css`
  ${props => props.theme.mixins.componentBox}

  ${props => props.disabled && props.theme.mixins.disabled};
  ${props => props.readOnly && props.theme.mixins.readOnly};
`;
