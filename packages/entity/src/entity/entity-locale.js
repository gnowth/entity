import Entity from './entity';
import CharField from '../field/field-char';
import IdField from '../field/field-id';

export default class Locale extends Entity {
  static fields = {
    // TODO add translations here. in same format that we pass to intlProvider
    defaultMessage: new CharField(),
    description: new CharField(),
    id: new CharField(),
    uuid: new IdField(),
  }
}
