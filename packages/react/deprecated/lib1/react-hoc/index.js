import { toObjectIfArray, mapEntries } from 'lib/context-methods';

const req = require.context('./', false, /\.jsx$/);

export default req.keys()::toObjectIfArray()::mapEntries(
  key => ({
    [key.replace(/^.+\/([^/]+)\.jsx/, '$1')]: req(key).default,
  }),
);
