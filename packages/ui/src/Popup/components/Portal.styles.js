import styled from 'styled-components';
import { color } from '@burnsred/theme';

export const Container = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: auto;
`;

export const Content = styled.div`
  background-color: ${color({ palette: 'white' })};
  border: 2px solid ${color({ palette: 'black' })};
  border-radius: 5px;
  max-width: 1024px;
  min-height: 100px;
  width: 80%;

  @media (max-width: 539px) {
    width: 95%;
  }
`;
