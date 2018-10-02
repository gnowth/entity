import EntityBase from './entity-base';
import BooleanField from '../field/field-boolean';
import CharField from '../field/field-char';
import IdField from '../field/field-id';
import IntegerField from '../field/field-integer';

export default class Title extends EntityBase {
  static fields = {
    is_archived: new BooleanField({ default: false }),
    order: new IntegerField(),
    title: new CharField(),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true }),
  };

  static toString(record) {
    return record?.get('title') || '';
  }

  static toStringOrdered(record) {
    return `${record.get('order') + 1}. ${this.toString(record)}`;
  }
}
