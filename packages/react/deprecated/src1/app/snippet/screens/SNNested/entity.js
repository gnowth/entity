import { BaseEntity, Fields } from 'lib/entity';
import { ScreenDuck } from 'lib/entity-duck';

import NestedEntity from 'app/snippet/entities/Nested';

class SNNestedEntity extends BaseEntity {
  static name = 'SNNested';

  static fields = {
    form_nested: new Fields.EntityField({ entity: NestedEntity }),
  };
}

SNNestedEntity.duck = new ScreenDuck({ app: 'snippet', entity: SNNestedEntity });

export default SNNestedEntity;
