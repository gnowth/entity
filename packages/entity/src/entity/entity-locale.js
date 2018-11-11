import Entity from './entity';
import AnyField from '../field/field-any';
import CharField from '../field/field-char';
import IdField from '../field/field-id';

export default class Locale extends Entity {
  static fields = {
    // TODO add translations here. in same format that we pass to intlProvider
    // TODO check if AnyField is appropriate for messages
    messages: new AnyField(), // store all messages in a map/object with key as the language
    defaultMessage: new CharField(),
    description: new CharField(),
    id: new CharField(),
    uuid: new IdField(),
  }
}
