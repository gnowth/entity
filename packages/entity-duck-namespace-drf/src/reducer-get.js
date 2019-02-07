import { fromJS, List } from 'immutable';

const getDataFactory = (payload, entity) => entity.dataToRecord(payload);

const listDataFactory = (payload, entity) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!entity.paginated && !Array.isArray(payload)) throw new Error(`RestDuck.listDataFactory (${entity.name}): data received is not an array. Could the endpoint be paginated?`);
    if (entity.paginated && Array.isArray(payload)) throw new Error(`RestDuck.listDataFactory (${entity.name}): data received is an array. Could the endpoint not be paginated?`);
  }

  return entity.paginated
    ? fromJS({
      ...payload,
      count: parseInt(payload.count, 10),
      results: payload.results.map(data => entity.dataToRecord(data)),
    })
    : payload.map(data => entity.dataToRecord(data));
};

export default types => ({
  [types.get]: (state, action = {}) => {
    const identifier = action.duck?.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'getting', identifier], action.meta.sideEffect)
        .setIn(['status', 'gettingDidFail', identifier], false),
    );
  },

  [types.get_resolved]: (state, action) => {
    const identifier = action.duck?.getIdentifier(action.meta);
    const dataFactory = action.meta.id ? getDataFactory : listDataFactory;

    return state.withMutations(
      s => s
        .updateIn(
          action.meta.id
            ? ['detail', action.meta.id]
            : ['list', identifier],
          result => (
            action.meta.skipStore
              ? result
              : fromJS(dataFactory(action.payload, action.duck.entity))
          ),
        )
        .updateIn(
          action.meta.id
            ? ['detail_dirty', action.meta.id]
            : ['list_dirty', identifier],
          result => (
            action.meta.skipStore
              ? result
              : fromJS(dataFactory(action.payload, action.duck.entity))
          ),
        )
        .setIn(
          action.meta.id
            ? ['detail_errors', action.meta.id]
            : ['list_errors', identifier],
          List(),
        )
        .setIn(['status', 'getting', identifier], false),
    );
  },

  [types.get_rejected]: (state, action) => {
    const identifier = action.duck?.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(
          action.meta.id
            ? ['detail_errors', action.meta.id]
            : ['list_errors', identifier],
          action.duck?.getErrors(action.payload),
        )
        .setIn(['status', 'getting', identifier], false)
        .setIn(['status', 'gettingDidFail', identifier], true),
    );
  },
});
