import CharField from '../field/field-char';
import EntityBase from './entity-base';

export default class Enum extends EntityBase {
  static idField = 'value';

  static fields = {
    value: new CharField(),
    label: new CharField(),
  };

  static toString(record) {
    return record.get('label');
  }
}
