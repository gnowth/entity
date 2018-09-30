import DuckScreen from '@entity/duck-namespace-screen';
import { Entity, Fields } from '@entity/core';
import { List } from 'immutable';

import EntityPerson from 'apps/people/entities/Person';

class Local extends Entity {
  static fields = {
    description: new Fields.TextField(),

    title: new Fields.CharField(),

    titles: new Fields.CharField({
      default: List(['test', 'test2']),
      many: true,
    }),

    user: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
    }),

    users: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
      many: true,
    }),
  };
}

Local.duck = new DuckScreen({ app: 'Snippet', entity: Local });

export default Local;
