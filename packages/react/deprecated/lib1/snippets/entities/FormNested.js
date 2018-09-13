import { FilterEntity, Fields } from 'lib/entity';

import FormBasicEntity from './FormBasic';

class FormNested extends FilterEntity {
  static name = 'FormNested';

  static fields = {
    text1: new Fields.TextField(),
    text2: new Fields.TextField(),

    entity: new Fields.EntityField({
      entity: FormBasicEntity,
      valueToParams: x => x,
    }),

    entities: new Fields.EntityField({
      entity: FormBasicEntity,
      multi: true,
    }),
  }
}

export default FormNested;
