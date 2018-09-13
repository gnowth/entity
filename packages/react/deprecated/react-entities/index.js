import PropTypes from 'prop-types';

import createEntityDuck from 'lib/duck-entity';

import Fields from './fields';
import Entity from './entity';

export { default as createEntityDuck } from 'lib/duck-entity';
export { default as Epics } from 'lib/epic-entities';

export { default as Validators } from './validators';
export { default as Entity } from './entity';
export { default as Fields } from './fields';

export const PropTypesEntity = {
  entity: PropTypes.instanceOf(Entity),
  field: PropTypes.instanceOf(Fields.Field),
};

export const createEntityWithDuck = (...options) => {
  const entity = new Entity(...options);
  entity.duck = createEntityDuck({ entity });

  return entity;
};
