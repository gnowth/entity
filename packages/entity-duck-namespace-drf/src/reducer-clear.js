import { getIdentifier } from './utils';

// TODO might need to use idIdenfier?
export default (types, initialState) => ({
  [types.clear]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return action.meta.dirty
      ? state.setIn(['detail_dirty', identifier], state.getIn(['detail', identifier]))
      : state.withMutations(
        s => s
          .setIn(['detail', identifier], initialState.getIn(['detail', identifier]))
          .setIn(['detail_dirty', identifier], initialState.getIn(['detail', identifier])),
      );
  },
});
