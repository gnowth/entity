import DuckDjangoRestFramework from '@entity/duck-namespace-drf';
import { Fields } from '@entity/core';
import { mock } from '@entity/duck-mock-drf';

import settings from 'settings';
import EntityAction from 'apps/activity/entities/Action';
import EntityActivity from 'apps/activity/entities/Activity';

class Observation extends EntityActivity {
  static fields = Object.assign({}, EntityActivity.fields, {
    follow_up_actions: new Fields.EntityField({
      entity: EntityAction,
      many: true,
    }),
  })

  static actionActionsAdd(record) {
    return record.update('follow_up_actions', actions => actions.push(
      EntityAction.dataToRecord({
        order: actions.size,
      }),
    ));
  }

  static getPaths() {
    return {
      apiBase: `/${settings.NAMESPACE}-observation/v1/observation/`,
      urlBase: '/observation/',
    };
  }
}

Observation.duck = new DuckDjangoRestFramework({ app: 'Observation', entity: Observation });
mock(Observation, { size: 20 });

export default Observation;
