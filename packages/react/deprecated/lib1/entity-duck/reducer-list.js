import { stringify } from 'query-string';

const getIdentifier = ({ params, method = 'list' }) => `${method}.${stringify(params)}`;

export default types => ({
  [types.list]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.setIn(
      ['status', 'isGetting', identifier],
      true,
    );
  },

  [types.list_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['list', identifier], action.payload)
        .setIn(['errors', identifier], null)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], false),
    );
  },

  [types.list_failed]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], action.payload)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], true),
    );
  },
});
