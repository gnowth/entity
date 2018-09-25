import { injectGlobal } from 'react-emotion';

import { global } from 'styles';

console.log('global', global);
export default function () {
  return injectGlobal`
    ${global}
  `;
}
