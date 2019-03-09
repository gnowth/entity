import faker from 'faker';

export default function (entities, configs = {}) {
  const computedEntities = Array.isArray(entities)
    ? entities
    : [entities];

  return computedEntities.map(entity => Object.assign(entity, {
    store: entity.mockMany(faker, configs),
  }));
}
