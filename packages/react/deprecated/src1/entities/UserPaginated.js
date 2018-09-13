import { BaseEntity, Fields } from 'lib/entity';
import createEntityDuck from 'lib/duck-entity';

const UserPaginated = BaseEntity.extends({
  name: 'UserPaginated',
  apiBase: '/users/paginated',
  paginated: true,

  fields: {
    id: Fields.UuidField,
    username: Fields.CharField,
  },
});

export const Duck = createEntityDuck({ entity: UserPaginated });

export default UserPaginated;
