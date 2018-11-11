import styled, { css } from 'styled-components';

export const InputText = styled.input`
  ${props => props.theme.mixins?.componentBox}

  margin-bottom: 20px;
`;

export default {
  inputs: css`
    margin-bottom: 20px;
  `,
};
