import { BaseEntity, Fields } from 'lib/entity';
import { EntityDuck } from 'lib/entity-duck';

class PersonEntity extends BaseEntity {
  static name = 'Person';
  static idField = 'id';
  static apiBase = '/people/v1/person';
  static paginated = true;

  static fields = {
    id: new Fields.IdField(),
    username: new Fields.CharField(),
    last_name: new Fields.CharField({ blank: true }),
    first_name: new Fields.CharField({ blank: true }),
  };

  static toString(record) {
    if (!record) return '';

    if (!record.get('last_name') && !record.get('first_name')) return record.get('username');

    return record.get('last_name') && record.get('first_name')
      ? `${record.get('last_name')}, ${record.get('first_name')}`
      : (record.get('last_name') || record.get('first_name'));
  }
}

PersonEntity.duck = new EntityDuck({ app: 'People', entity: PersonEntity });

export default PersonEntity;
