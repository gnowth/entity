import DuckRest from '@entity/duck-rest';
import { Entity, Fields } from '@entity/core';

import settings from 'settings';

class Person extends Entity {
  static apiBase = `/${settings.PROJECT_NAME}_map/v1/user/`;

  static idField = 'id';

  static paginated = true;

  static fields = {
    id: new Fields.IdField(),
    username: new Fields.CharField(),
    first_name: new Fields.CharField(),
    last_name: new Fields.CharField(),
  };

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
