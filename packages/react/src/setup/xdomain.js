import { xdomain } from 'xdomain';

import settings from 'settings';

export default function () {
  xdomain.slaves({
    [settings.BASE_API_DOMAIN]: '/api/xdomain/v1/proxy',
  });
}
