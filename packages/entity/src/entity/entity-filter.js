import IntegerField from '../field/field-integer';
import EntityBase from './entity-base';

export default class Filter extends EntityBase {
  static fields = {
    page: new IntegerField({ default: 1 }),
    page_size: new IntegerField({ default: 20 }),
  };

  static asParams(record, options) {
    return (record || Map())
      .filter((value, key) => key in this.fields)
      .filterNot((value, key) => this.fields[key].local)
      .map((value, key) => this.fields[key].asParams(value, options))
      .flatten();
  }
}
