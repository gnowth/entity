import uuid from 'uuid/v1';

export default (entities) => {
  const computedEntities = Array.isArray(entities)
    ? entities
    : [entities];

  return computedEntities.map((entity) => {
    entity.mockStoreNull = entity.dataToRecord({ // eslint-disable-line no-param-reassign
      [entity.idField]: uuid(),
    });

    return entity;
  });
};
