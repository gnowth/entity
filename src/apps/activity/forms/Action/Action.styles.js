import styled, { css } from 'styled-components';
import { color } from '@gnowth/style';

export const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${color({ name: 'gray' })};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

export default {
  input: css`
    margin-top: 1.5rem;
  `,

  control: css`
    margin-top: 0.5rem;
  `,
};
