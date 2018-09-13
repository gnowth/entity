import { BaseEntity, Fields } from 'lib/entity';
import createEntityDuck from 'lib/duck-entity';

import ExampleSubEntity from './ExampleSub';

const Example = BaseEntity.extends({
  name: 'Example',
  idField: 'uuid',
  apiBase: '',
  paginated: true,

  fields: {
    uuid: Fields.UuidField,
    task: Fields.CharField.extends({
      valueWillChange: ({ nextValue }) => (nextValue === ':smile' ? ':)' : nextValue),
    }),
    description: Fields.IntegerField,
    sub_form: Fields.EntityField.extends({
      entity: ExampleSubEntity,
      defaultValue: ExampleSubEntity.dataToRecord(),
    }),
  },

  valueWillChange: ({ value, nextValue }) => (
    nextValue.get('uuid') === '12345' && value.get('uuid') !== '12345'
      ? nextValue.set('task', 'it is 12345')
      : nextValue
  ),
});

export const Duck = createEntityDuck({ entity: Example });

export default Example;
