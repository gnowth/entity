import Entity from './entity';
import EntityLocale from './entity-locale';
import CharField from '../field/field-char';
import EntityField from '../field/field-entity';

export default class Enum extends Entity {
  static idField = 'value'

  static fields = {
    label: new CharField(),
    locale: new EntityField({
      blank: true,
      entity: EntityLocale,
    }),
    value: new CharField(),
  }

  static toString(record) {
    return record?.get('label') || '';
  }

  static toLocale(record) {
    return record?.get('locale');
  }
}
