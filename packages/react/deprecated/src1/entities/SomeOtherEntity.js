import { BaseEntity, Fields } from 'lib/entity';
import createEntityDuck from 'lib/duck-entity';

const SomeOtherEntity = BaseEntity.extends({
  name: 'SomeOtherEntity',
  idField: 'uuid',
  apiBase: '',
  paginated: true,

  fields: {
    uuid: Fields.UuidField,
    task: Fields.CharField,
    description: Fields.IntegerField.extends({
      preventDefaultValidation: true,
      noValidate: true,
      defaultValue: 0,
    }),
  },
});

export const Duck = createEntityDuck({ entity: SomeOtherEntity });

export default SomeOtherEntity;
