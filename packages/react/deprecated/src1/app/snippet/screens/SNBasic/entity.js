import { BaseEntity } from 'lib/entity';
import { ScreenDuck } from 'lib/entity-duck';

import BasicEntity from 'app/snippet/entities/Basic';

class SNBasicEntity extends BaseEntity {
  static name = 'SNBasic';

  static fields = {
    form_basic: new this.fields.EntityField({ entity: BasicEntity }),
  }
}

SNBasicEntity.duck = new ScreenDuck({ app: 'Snippet', entity: 'SNBasic' });

export default SNBasicEntity;
