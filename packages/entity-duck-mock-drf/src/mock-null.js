import faker from 'faker';

export default (entities) => {
  const computedEntities = Array.isArray(entities)
    ? entities
    : [entities];

  return computedEntities.map((entity) => {
    entity.mockStoreNull = entity.mock(faker, 0); // eslint-disable-line no-param-reassign

    return entity;
  });
};
