import { getIdentifier, parseError } from './utils';

export default (types, initialState) => ({
  [types.delete]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'deleting', identifier], true)
        .setIn(['status', 'deletingDidFail', identifier], false),
    );
  },

  [types.delete_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const idIdentifier = getIdentifier({ ...action.meta, useId: true });

    return state.withMutations(
      s => s
        .deleteIn(['detail', idIdentifier])
        .deleteIn(['detail_dirty', idIdentifier])
        .setIn(['errors', identifier], null)
        .setIn(['status', 'deleting', identifier], false)
        .update('list', list => (action.meta.invalidateList ? initialState.get('list') : list))
        .update('list_dirty', list => (action.meta.invalidateList ? initialState.get('list_dirty') : list)),
    );
  },

  [types.delete_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], parseError(action.payload))
        .setIn(['status', 'deleting', identifier], false)
        .setIn(['status', 'deletingDidFail', identifier], true),
    );
  },
});
