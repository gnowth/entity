import { fromJS } from 'immutable';

import { getIdentifier, parseError } from './utils';

export default types => ({
  [types.options]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'optioning', identifier], true)
        .setIn(['status', 'optioningDidFail', identifier], false),
    );
  },

  [types.options_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['options_errors', identifier], null)
        .setIn(['options', identifier], fromJS(action.payload))
        .setIn(['status', 'optioning', identifier], false),
    );
  },

  [types.options_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['options_errors', identifier], parseError(action.payload)) // TODO move errors in detail_errors and list_errors?
        .setIn(['status', 'optioning', identifier], false)
        .setIn(['status', 'optioningDidFail', identifier], true),
    );
  },
});
