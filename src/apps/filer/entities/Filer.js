import { Entity, Fields } from '@entity/core';
import DuckRest from '@entity/duck-rest';

class Filer extends Entity {
  static apiBase = '/filer/'; // TODO add apibase

  static idField = 'id';

  static fields = {
    id: new Fields.IdField(),
  };
}

Filer.duck = new DuckRest({ app: 'Filer', entity: Filer });

export default Filer;
