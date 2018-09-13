import { getIdentifier, parseError } from './utils';

export default (types, initialState) => ({
  [types.save]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .updateIn(['detail_dirty', action.meta.id], detail => (
          action.meta.dirty
            ? action.payload
            : detail
        ))
        .setIn(['status', 'saving', identifier], true)
        .setIn(['status', 'savingDidFail', identifier], false),
    );
  },

  // TODO also set record for new uuid if id was null
  [types.save_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    const record = action.meta.entity.dataToRecord(action.payload);

    return state.withMutations(
      s => s
        .updateIn(['detail', action.meta.id], detail => (
          action.meta.skipStore
            ? detail
            : record
        ))
        .setIn(
          ['detail_dirty', action.meta.id],
          action.meta.skipStore
            ? state.getIn(['detail', action.meta.id])
            : record,
        )
        .setIn(['errors', identifier], null)
        .setIn(['status', 'saving', identifier], false)
        .update('list', list => (action.meta.invalidateList ? initialState.get('list') : list))
        .update('list_dirty', list => (action.meta.invalidateList ? initialState.get('list_dirty') : list)),
    );
  },

  [types.save_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], parseError(action.payload))
        .setIn(['status', 'saving', identifier], false)
        .setIn(['status', 'savingDidFail', identifier], true),
    );
  },
});
