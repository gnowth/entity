import EntityBase from './entity-base';
import FieldBoolean from '../field/field-boolean';
import FieldChar from '../field/field-char';
import FieldId from '../field/field-id';

export default class Title extends EntityBase {
  static fields = {
    uuid: new FieldId({ blank: true }),
    title: new FieldChar(),
    title_short: new FieldChar({ blank: true }),
    is_archived: new FieldBoolean({ default: false }),
  };

  static toString(record) {
    return (record || Map()).get('title', '');
  }
}
