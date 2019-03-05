import Entity from './entity';
import AnyField from '../field/field-any';
import CharField from '../field/field-char';
import IdField from '../field/field-id';

export default class Locale extends Entity {
  static fields = {
    messages: new AnyField(),
    defaultMessage: new CharField(),
    description: new CharField(),
    id: new CharField(),
    uuid: new IdField({ mock: 'random.uuid' }),
  }
}
