import { BaseEntity, Fields } from 'lib/entity';

class BasicEntity extends BaseEntity {
  static name = 'Basic';

  static fields = {
    uuid: new Fields.IdField(),
    input_char: new Fields.CharField({ blank: true }),
    input_text: new Fields.TextField({ blank: true }),
    input_integer: new Fields.IntegerField({ blank: true }),
  };
}

export default BasicEntity;
