import { injectGlobal } from 'styled-components';

export default function setupGlobalStyles(theme) {
  return injectGlobal`
    ${theme.global}
  `;
}
