import { Entity, Fields } from 'lib/entity';
import { DuckEntity } from 'lib/entity-duck';

class Filer extends Entity {
  static apiBase = '/filer/'; // TODO add apibase

  static idField = 'id';

  static fields = {
    id: new Fields.IdField(),
  };
}

Filer.duck = new DuckEntity({ app: 'Filer', entity: Filer });

export default Filer;
