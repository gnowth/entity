import { Entity, Fields } from 'lib/entity';
import { DuckScreen } from 'lib/entity-duck';

import EntityPerson from 'apps/people/entities/Person';

class Local extends Entity {
  static fields = {
    title: new Fields.CharField(),
    user: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
    }),
  };
}

Local.duck = new DuckScreen({ app: 'Snippet', entity: Local });

export default Local;
