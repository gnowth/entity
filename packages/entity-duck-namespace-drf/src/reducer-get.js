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
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['status', 'getting', identifier], action.meta.sideEffect)
        .setIn(['status', 'gettingDidFail', identifier], false),
    );
  },

  [types.get_resolved]: (state, action) => {
    const identifier = action.duck.getIdentifier(action.meta);
    const dataFactory = action.meta.id === undefined ? listDataFactory : getDataFactory;

    const record = fromJS(dataFactory(action.payload, action.duck.entity));

    return state.withMutations(
      s => s
        .updateIn(
          action.meta.id === undefined
            ? ['list', identifier]
            : ['detail', action.duck.entity.getId(record)],
          result => (action.meta.skipStore || action.meta.skipRecordUpdate ? result : record),
        )
        .updateIn(
          action.meta.id === undefined
            ? ['list_dirty', identifier]
            : ['detail_dirty', action.duck.entity.getId(record)],
          result => (action.meta.skipStore || action.meta.skipRecordUpdate ? result : record),
        )
        .updateIn(
          action.meta.id === undefined
            ? ['list', identifier]
            : ['detail', action.meta.action ? identifier : action.duck.entity.getId(record)],
          result => (!action.meta.skipStore && action.meta.id === null && action.meta.action ? record : result),
        )
        .updateIn(
          action.meta.id === undefined
            ? ['list_dirty', identifier]
            : ['detail_dirty', action.meta.action ? identifier : action.duck.entity.getId(record)],
          result => (!action.meta.skipStore && action.meta.id === null && action.meta.action ? record : result),
        )
        .setIn(
          action.meta.id === undefined
            ? ['list_errors', identifier]
            : ['detail_errors', action.duck.getId(action.meta)],
          List(),
        )
        .setIn(['status', 'getting', identifier], false),
    );
  },

  [types.get_rejected]: (state, action) => {
    const identifier = action.duck.getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(
          action.meta.id === undefined
            ? ['list_errors', identifier]
            : ['detail_errors', action.duck.getId(action.meta)],
          action.duck?.getErrors(action.payload),
        )
        .setIn(['status', 'getting', identifier], false)
        .setIn(['status', 'gettingDidFail', identifier], true),
    );
  },
});
