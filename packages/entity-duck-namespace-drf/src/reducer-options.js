import { fromJS } from 'immutable';

export default types => ({
  [types.options]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'optioning', identifier], true)
        .setIn(['status', 'optioningDidFail', identifier], false),
    );
  },

  [types.options_resolved]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['options_errors', identifier], null)
        .setIn(['options', identifier], fromJS(action.payload))
        .setIn(['status', 'optioning', identifier], false),
    );
  },

  [types.options_rejected]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['options_errors', identifier], action.duck.getErrors(action.payload))
        .setIn(['status', 'optioning', identifier], false)
        .setIn(['status', 'optioningDidFail', identifier], true),
    );
  },
});
