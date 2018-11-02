import styled, { css } from 'styled-components';

export const Controls = styled.div`
  display: flex;

  ${props => props.css}
`;

export default {
  buttons: css`
    margin-left: 24px;
  `,
};
