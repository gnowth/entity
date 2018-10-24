import DuckRest from '@entity/duck-namespace-drf';
import { EntityActivity, Fields } from '@entity/core';

import EntityAction from 'apps/action/entities/Action';

class Observation extends EntityActivity {
  static apiBase = '/observation/v1/observation/'

  static fields = Object.assign({}, EntityActivity.fields, {
    follow_up_actions: new Fields.EntityField({
      entity: EntityAction,
      many: true,
    }),
  })
}

Observation.duck = new DuckRest({ app: 'Observation', entity: Observation });

export default Observation;
