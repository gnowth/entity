import { Entity, Fields } from '@gnowth/entity';
import DuckRest from '@gnowth/entity-duck-rest';

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
