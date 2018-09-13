import styled, { css } from 'styled-components';

export default styled.div`
  ${props => props.inline && css`
    display: flex;
    align-items: center;
  `}

  ${props => props.reverse && css`
    flex-direction: row-reverse;
  `}
`;
