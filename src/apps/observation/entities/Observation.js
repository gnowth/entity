import DuckRest from '@entity/duck-namespace-drf';
import { EntityActivity } from '@entity/core';

class Observation extends EntityActivity {
  static apiBase = '/observation/v1/observation/'
}

Observation.duck = new DuckRest({ app: 'Observation', entity: Observation });

export default Observation;
