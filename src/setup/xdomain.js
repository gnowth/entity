import { xdomain } from 'xdomain';

export default function setupXDomain(settings) {
  xdomain.slaves({
    [settings.BASE_API_DOMAIN]: '/api/xdomain/v1/proxy',
  });
}
