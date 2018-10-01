import Fields from '../field';
import EntityBase from './entity-base';

export default class Filter extends EntityBase {
  static fields = {
    page: new Fields.IntegerField({ default: 1 }),
    page_size: new Fields.IntegerField({ default: 20 }),
  };

  static asParams(record, options) {
    return (record || Map())
      .filter((value, key) => key in this.fields)
      .filterNot((value, key) => this.fields[key].local)
      .map((value, key) => this.fields[key].asParams(value, options))
      .flatten();
  }
}
