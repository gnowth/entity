import { Entity, Fields } from 'lib/entity';

class FormBasic extends Entity {
  static name = 'FormBasic';

  static fields = {
    char1: new Fields.CharField(),
    char2: new Fields.CharField(),
  }
}

export default FormBasic;
