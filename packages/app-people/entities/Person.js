import DuckDjangoRestFramework from '@entity/duck-namespace-drf';
import { Entity, Fields } from '@entity/core';

class Person extends Entity {
  static idField = 'id';

  static paginated = true;

  static fields = {
    id: new Fields.IdField({ mock: 'random.uuid' }),
    username: new Fields.CharField({ mock: 'internet.userName' }),
    first_name: new Fields.CharField({ mock: 'name.firstName' }),
    last_name: new Fields.CharField({ mock: 'name.lastName' }),
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

Person.duck = new DuckDjangoRestFramework({ app: 'People', entity: Person });

export default Person;
