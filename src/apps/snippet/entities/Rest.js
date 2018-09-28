import DuckRest from '@entity/duck-rest';
import { Entity, Fields } from '@entity/core';

import settings from 'settings';
import EntityPerson from 'apps/people/entities/Person';

class Rest extends Entity {
  static apiBase = `/${settings.PROJECT_NAME}_snippet/v1/rest/`;

  static fields = {
    user: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
    }),
  };
}

Rest.duck = new DuckRest({ app: 'Snippet', entity: Rest });

export default Rest;
