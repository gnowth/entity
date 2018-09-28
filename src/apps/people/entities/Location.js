import DuckRest from '@entity/duck-rest';
import { BaseEntity, Fields } from '@entity/core';

import settings from 'settings';

class Location extends BaseEntity {
  static apiBase = `/${settings.PROJECT_NAME}_tz/v1/locations/`;

  static paginated = true;

  static fields = {
    uuid: new Fields.IdField(),
    name: new Fields.CharField(),
    project: new Fields.AnyField(),
  };

  static toString(record) {
    return record.get('name');
  }
}

Location.duck = new DuckRest({ app: 'People', entity: Location });

export default Location;
