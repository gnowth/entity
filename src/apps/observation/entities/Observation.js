import DuckRest from '@entity/duck-namespace-drf';
import { EntityActivity, Fields } from '@entity/core';

import EntityAction from 'apps/activity/entities/Action';

class Observation extends EntityActivity {
  static apiBase = '/observation/v1/observation/'

  static urlBase = '/observation/';

  static fields = Object.assign({}, EntityActivity.fields, {
    follow_up_actions: new Fields.EntityField({
      entity: EntityAction,
      many: true,
    }),
  })

  // TODO refactor paths
  static paths = {
    apiBase: '/observation/v1/observation/',
    urlBase: '/observation/',
  }
}

Observation.duck = new DuckRest({ app: 'Observation', entity: Observation });

export default Observation;
