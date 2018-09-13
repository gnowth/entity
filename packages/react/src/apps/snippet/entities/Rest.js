import { Entity, Fields } from 'lib/entity';
import { DuckEntity } from 'lib/entity-duck';
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

Rest.duck = new DuckEntity({ app: 'Snippet', entity: Rest });

export default Rest;
