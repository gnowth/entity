import DuckDjangoRestFramework from '@entity/duck-namespace-drf';
import { Entity, Fields } from '@entity/core';
import { mock } from '@entity/duck-mock-drf';

class Person extends Entity {
  static idField = 'id';

  static paginated = true;

  static fields = {
    avatar: new Fields.CharField({ mock: 'image.avatar' }),
    first_name: new Fields.CharField({ mock: 'name.firstName' }),
    id: new Fields.IdField({ mock: 'random.uuid' }),
    last_name: new Fields.CharField({ mock: 'name.lastName' }),
    username: new Fields.CharField({ mock: 'internet.userName' }),
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

Person.duck = new DuckDjangoRestFramework({
  app: 'People',
  entity: Person,
  name: 'Person',
});

mock(Person, { size: 20 });

export default Person;
