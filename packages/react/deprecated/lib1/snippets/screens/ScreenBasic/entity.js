import { Entity, Fields } from 'lib/entity';
import { ScreenDuck } from 'lib/entity-duck';

import FormBasicEntity from '../../entities/FormBasic';

class ScreenBasicEntity extends Entity {
  static name = 'Basic';

  static fields = {
    form_basic: new Fields.EntityField({ entity: FormBasicEntity }),
  };
}

ScreenBasicEntity.duck = new ScreenDuck({
  entity: ScreenBasicEntity,
  app: 'Snippet',
});

export default ScreenBasicEntity;
