import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Popup = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  top: 0;
  left: 0;
  padding: 8px;
  position: absolute;
  transform: translateY(-100%);
`;
