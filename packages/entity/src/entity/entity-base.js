import { List } from 'immutable';

import Entity from './entity';

// TODO check if need to deprecate Base
export default class Base extends Entity {
  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be set.`);
      if (!List.isList(records)) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be an immutable list`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "index" option must be set`);
    }

    return records.delete(index);
  }

  // TODO
  static actionArrayMoveAtIndex() {}

  static actionReset(record) { // TODO check if reset should be reset to initialValue
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }
}
