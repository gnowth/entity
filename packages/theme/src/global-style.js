import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${props => props.theme?.global}
`;

export default GlobalStyles;
