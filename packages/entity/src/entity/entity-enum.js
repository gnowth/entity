import Entity from './entity';
import EntityLocale from './entity-locale';
import BooleanField from '../field/field-boolean';
import CharField from '../field/field-char';
import EntityField from '../field/field-entity';

export default class Enum extends Entity {
  static idField = 'value'

  static fields = {
    disabled: new BooleanField({ default: false }),
    hidden: new BooleanField({ default: false }),
    label: new CharField(),
    locale: new EntityField({
      blank: true,
      entity: EntityLocale,
    }),
    value: new CharField(),
  }

  static toString(record) {
    return (record && record.get('label')) || '';
  }
}
