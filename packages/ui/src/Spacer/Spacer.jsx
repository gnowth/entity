import styled, { css } from 'styled-components';

export default styled.div`
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  ${props => props.margin && css`
    margin: ${props.margin};
  `}

  ${props => props.padding && css`
    padding: ${props.padding};
  `}
`;
