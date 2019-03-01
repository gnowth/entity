import DuckRest from '@entity/duck-namespace-drf';
import { Entity, Fields } from '@entity/core';

class Person extends Entity {
  static idField = 'id';

  static paginated = true;

  static fields = {
    id: new Fields.IdField(),
    username: new Fields.CharField(),
    first_name: new Fields.CharField(),
    last_name: new Fields.CharField(),
  };

  static paths = {
    apiBase: '/people/v1/person/',
  }

  static toString(record) {
    if (!record) return '';

    if (!record.get('last_name') && !record.get('first_name')) return record.get('username');

    return record.get('last_name') && record.get('first_name')
      ? `${record.get('last_name')}, ${record.get('first_name')}`
      : (record.get('last_name') || record.get('first_name'));
  }
}

Person.duck = new DuckRest({ app: 'People', entity: Person });

export default Person;
