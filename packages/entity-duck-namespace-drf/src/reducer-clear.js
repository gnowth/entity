export default (types, initialState) => ({
  [types.clear]: (state, action = {}) => {
    const identifier = action.duck.getIdentifier(action.meta);
    const id = action.duck.getId(action.meta);

    return action.meta?.dirty
      ? state.setIn(
        action.meta?.id === undefined ? ['list_dirty', identifier] : ['detail_dirty', id],
        state.getIn(action.meta?.id === undefined ? ['list', identifier] : ['detail', id]),
      )
      : state.withMutations(
        s => s
          .setIn(
            action.meta?.id === undefined ? ['list', identifier] : ['detail', id],
            initialState.getIn(action.meta?.id === undefined ? ['list', identifier] : ['detail', id]),
          )
          .setIn(
            action.meta?.id === undefined ? ['list_dirty', identifier] : ['detail_dirty', id],
            initialState.getIn(action.meta?.id === undefined ? ['list', identifier] : ['detail', id]),
          ),
      );
  },
});
