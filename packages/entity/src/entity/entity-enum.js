import Entity from './entity';
import CharField from '../field/field-char';

export default class Enum extends Entity {
  static idField = 'value'

  static fields = {
    label: new CharField(),
    value: new CharField(),
  }

  static toString(record) {
    return record?.get('label') || '';
  }
}
