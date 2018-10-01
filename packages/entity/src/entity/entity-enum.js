import Fields from '../field';
import EntityBase from './entity-base';

export default class Enum extends EntityBase {
  static idField = 'value';

  static fields = {
    value: new Fields.CharField(),
    label: new Fields.CharField(),
  };

  static toString(record) {
    return record.get('label');
  }
}
