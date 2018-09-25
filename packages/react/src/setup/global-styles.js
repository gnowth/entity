import { injectGlobal } from 'styled-components';

import { global } from 'styles';

export default function () {
  return injectGlobal`
    ${global}
  `;
}
