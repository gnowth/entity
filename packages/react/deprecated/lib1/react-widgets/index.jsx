import { toObjectIfArray, mapEntries } from 'lib/context-methods';

const req = require.context('.', true, /\.\/[^/]+\/index\.jsx$/);

export default req.keys()::toObjectIfArray()::mapEntries(
  key => ({
    [key.replace(/^.+\/([^/]+)\/index\.jsx/, '$1')]: req(key).default,
  }),
);
