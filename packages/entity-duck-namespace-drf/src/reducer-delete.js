import { List } from 'immutable';

export default (types, initialState) => ({
  [types.delete]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'deleting', identifier], true)
        .setIn(['status', 'deletingDidFail', identifier], false),
    );
  },

  [types.delete_resolved]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);
    const id = action.duck.getId(action.meta);

    return state.withMutations(
      s => s
        .deleteIn(['detail', id])
        .deleteIn(['detail_dirty', id])
        .setIn(['detail_errors', id], List())
        .setIn(['status', 'deleting', identifier], false)
        .update('list', list => (action.meta.invalidateList ? initialState.get('list') : list))
        .update('list_dirty', list => (action.meta.invalidateList ? initialState.get('list_dirty') : list)),
    );
  },

  [types.delete_rejected]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);
    const id = action.duck.getId(action.meta);

    return state.withMutations(
      s => s
        .setIn(['detail_errors', id], action.duck.getErrors(action.payload))
        .setIn(['status', 'deleting', identifier], false)
        .setIn(['status', 'deletingDidFail', identifier], true),
    );
  },
});
