import styled from 'styled-components';
import { mixins } from '@burnsred/theme';

export const Container = styled.div`
  display: inline-block;
  line-height: 0;
  position: relative;

  ${mixins.margin}
`;

export const Input = styled.input`
  bottom: 0;
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;
