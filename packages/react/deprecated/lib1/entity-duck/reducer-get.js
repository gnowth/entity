import { stringify } from 'query-string';

const getIdentifier = ({ id, params, method = 'get' }) => `${method}.${id}.${stringify(params)}`;

export default types => ({
  [types.get]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.setIn(
      ['status', 'isGetting', identifier],
      true,
    );
  },

  [types.get_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);
    const id = action.meta.options.method === 'get' && !action.meta.options.params
      ? action.meta.options.id
      : identifier;

    return state.withMutations(
      s => s
        .setIn(['detail', id], action.payload)
        .setIn(['errors', identifier], null)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], false),
    );
  },

  [types.get_failed]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], action.payload)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], true),
    );
  },
});
