import { stringify } from 'query-string';

const getIdentifier = ({ id, params, method = 'option' }) => `${method}.${id}.${stringify(params)}`;

export default types => ({
  [types.options]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.setIn(
      ['status', 'isGetting', identifier],
      true,
    );
  },

  [types.options_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['options', identifier], action.payload)
        .setIn(['errors', identifier], null)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], false),
    );
  },

  [types.options_failed]: (state, action) => {
    const identifier = getIdentifier(action.meta.options);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], action.payload)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFailed', identifier], true),
    );
  },
});
