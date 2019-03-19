import idx from 'idx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${props => idx(props, x => x.theme.global)}
`;

export default GlobalStyles;
