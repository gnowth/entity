import _keyBy from 'lodash/keyBy';
import _range from 'lodash/range';
import faker from 'faker';

export default (entities, configs = {}) => {
  const computedEntities = Array.isArray(entities)
    ? entities
    : [entities];

  return computedEntities.map((entity) => {
    entity.mockStore = _keyBy( // eslint-disable-line no-param-reassign
      _range(configs.size).map(index => entity.mock(faker, index)),
      entity.idField,
    );

    return entity;
  });
};
