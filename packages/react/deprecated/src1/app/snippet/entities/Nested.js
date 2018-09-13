import { BaseEntity, Fields } from 'lib/entity';
import BasicEntity from 'app/snippet/entities/Basic';

class NestedEntity extends BaseEntity {
  static name = 'Nested';

  static fields = {
    form_basic: new Fields.EntityField({ entity: BasicEntity }),
    form_basic_select: new Fields.EntityField({
      entity: BasicEntity,
      default: null,
    }),
  };
}

export default NestedEntity;
