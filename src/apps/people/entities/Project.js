import DuckRest from '@entity/duck-namespace-drf';
import { EntityBase, Fields } from '@entity/core';

import settings from 'settings';

import EntityPerson from './Person';

class Project extends EntityBase {
  static apiBase = `/${settings.PROJECT_NAME}_tz/v1/projects/`;

  static paginated = true;

  static fields = {
    uuid: new Fields.IdField(),
    name: new Fields.CharField(),
    id_from_ad: new Fields.CharField(),
    hse_reps: new Fields.EntityField({
      entity: EntityPerson,
      many: true,
    }),
  };

  static toString(record) {
    return record.get('name');
  }
}

Project.duck = new DuckRest({ app: 'People', entity: Project });

export default Project;
