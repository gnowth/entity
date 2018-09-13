import { fromJS } from 'immutable';

import { getIdentifier } from './utils';

const getDataFactory = (payload, entity) => entity.dataToRecord(payload);

const listDataFactory = (payload, entity) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!entity.paginated && !Array.isArray(payload)) throw new Error(`entity-duck: list data received for entity "${entity.name}" is not an array. Could the endpoint be paginated?`);
    if (entity.paginated && Array.isArray(payload)) throw new Error(`entity-duck: list data received for entity "${entity.name}" is an array. Could the endpoint not be paginated?`);
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
  [types.get]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        // TODO remove updateIn and add option to flush on fail
        .updateIn(
          action.meta.id
            ? ['detail', action.meta.id]
            : ['list', identifier],
          detail => (action.meta.skipStore ? detail : undefined),
        )
        .setIn(['errors', identifier], undefined)
        .setIn(['status', 'isGetting', identifier], true)
        .setIn(['status', 'didGetFail', identifier], false),
    );
  },

  [types.get_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
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
              : fromJS(dataFactory(action.payload, action.meta.entity))
          ),
        )
        .setIn(['status', 'isGetting', identifier], false),
    );
  },

  [types.get_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);

    return state.withMutations(
      s => s
        .setIn(['errors', identifier], action.payload)
        .setIn(['status', 'isGetting', identifier], false)
        .setIn(['status', 'didGetFail', identifier], true),
    );
  },
});
