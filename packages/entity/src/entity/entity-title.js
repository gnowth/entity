import Fields from '../field';
import EntityBase from './entity-base';

export default class Title extends EntityBase {
  static fields = {
    uuid: new Fields.IdField({ blank: true }),
    title: new Fields.CharField(),
    title_short: new Fields.CharField({ blank: true }),
    is_archived: new Fields.BooleanField({ default: false }),
  };

  static toString(record) {
    return (record || Map()).get('title', '');
  }
}
