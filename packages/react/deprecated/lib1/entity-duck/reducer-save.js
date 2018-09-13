import { stringify } from 'query-string';

const getIdentifier = ({ id, params, method = 'save' }) => `${method}.${id}.${stringify(params)}`;

export default types => ({
  [types.save]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.setIn(
      ['status', 'isSaving', identifier],
      true,
    );
  },

  [types.save_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);
    const id = action.meta.options.method === 'save' && !action.meta.options.params
      ? action.meta.options.id
      : identifier;

    return state.withMutations(
      s => s
        .setIn(['detail', id], action.payload)
        .setIn(['errors', identifier], null)
        .setIn(['status', 'isSaving', identifier], false)
        .setIn(['status', 'didSaveFailed', identifier], false),
    );
  },

  [types.save_failed]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], action.payload)
        .setIn(['status', 'isSaving', identifier], false)
        .setIn(['status', 'didSaveFailed', identifier], true),
    );
  },
});
