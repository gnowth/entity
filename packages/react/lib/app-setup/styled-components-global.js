import { injectGlobal } from 'emotion';

import { global } from 'styles';

export default function () {
  return injectGlobal`
    ${global}
  `;
}
