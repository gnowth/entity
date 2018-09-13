import { BaseEntity, Fields } from 'lib/entity';
import createEntityDuck from 'lib/duck-entity';

const User = BaseEntity.extends({
  name: 'User',
  apiBase: '/users',

  fields: {
    id: Fields.UuidField,
    username: Fields.CharField,
  },
});

export const Duck = createEntityDuck({ entity: User });

export default User;
