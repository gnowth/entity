import { getIdentifier, parseError } from './utils';

// TODO maybe have save_local instead of save with dirty params. so that it can be easily identified in redux devtool
export default (types, initialState) => ({
  [types.save]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const idIdentifier = getIdentifier({ ...action.meta, useId: true });

    return state.withMutations(
      s => s
        .updateIn(['detail_dirty', idIdentifier], detail => (
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
    const idIdentifier = getIdentifier({ ...action.meta, useId: true });

    const record = action.meta.entity.dataToRecord(action.payload);

    return state.withMutations(
      s => s
        .updateIn(['detail', idIdentifier], detail => (
          action.meta.skipStore
            ? detail
            : record
        ))
        .setIn(
          ['detail_dirty', idIdentifier],
          action.meta.skipStore
            ? state.getIn(['detail', idIdentifier])
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
