import { List } from 'immutable';

export default (types, initialState) => ({
  [types.save]: (state, action = {}) => {
    const identifier = action.duck?.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'saving', identifier], true)
        .setIn(['status', 'savingDidFail', identifier], false),
    );
  },

  [types.save_local]: (state, action = {}) => state
    .setIn(['detail_dirty', action.duck?.getId(action.meta)], action.payload),

  [types.save_resolved]: (state, action = {}) => {
    const identifier = action.duck?.getIdentifier(action.meta);
    const id = action.duck?.getId(action.meta);

    const record = action.duck.entity.dataToRecord(action.payload);
    const newId = action.duck.entity.getId(record);

    return state.withMutations(
      s => s
        .updateIn(['detail', id], detail => (
          action.meta.skipStore
            ? detail
            : record
        ))
        .setIn(
          ['detail_dirty', id],
          action.meta.skipStore
            ? state.getIn(['detail', id])
            : record,
        )
        .updateIn(['detail', newId], detail => (
          newId === id
            ? detail
            : record
        ))
        .updateIn(['detail_dirty', newId], detail => (
          newId === id
            ? detail
            : record
        ))
        .setIn(['detail_errors', id], List())
        .setIn(['status', 'saving', identifier], false)
        .update('list', list => (action.meta.invalidateList ? initialState.get('list') : list))
        .update('list_dirty', list => (action.meta.invalidateList ? initialState.get('list_dirty') : list)),
    );
  },

  [types.save_rejected]: (state, action = {}) => {
    const identifier = action.duck?.getIdentifier(action.meta);
    const id = action.duck?.getId(action.meta);

    return state.withMutations(
      s => s
        .setIn(['detail_errors', id], action.duck?.getErrors(action.payload))
        .setIn(['status', 'saving', identifier], false)
        .setIn(['status', 'savingDidFail', identifier], true),
    );
  },
});
