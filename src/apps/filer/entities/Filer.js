import { Entity, Fields } from '@entity/core';
import DuckRest from '@entity/duck-namespace-drf';

class Filer extends Entity {
  static idField = 'id';

  static fields = {
    id: new Fields.IdField(),
  };

  static paths = {
    apiBase: '/filer/',
  }
}

Filer.duck = new DuckRest({ app: 'Filer', entity: Filer });

export default Filer;
