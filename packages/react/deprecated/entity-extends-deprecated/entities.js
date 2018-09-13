import { fromJS } from 'immutable';
import { callIfFunction, filterEntries, filterNotEntries, mapValues } from 'lib/context-methods';

import Extendable from '../class-extend';
import * as Fields from './fields';

export class Entity extends Extendable {
  asField() {
    return Fields.EntityField.extends({
      entity: this,
    });
  }

  clean(record) {
    return (this.cleaners || []).reduce(
      (cumm, cleaner) => cleaner(cumm, { entity: this }),
      record,
    );
  }

  // TODO Review
  dataToRecord(data) {
    return data
      ? fromJS(Object.assign(
        this.fields
          ::filterNotEntries((_, key) => key in data)
          ::mapValues(field => field.defaultValue::callIfFunction()), // TODO: maybe have field.getDefaultValue
        data::filterEntries((_, key) => key in this.fields),
      ))
      : null;
  }

  extends(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.name) throw new Error(`'name' option is required for entity '${this.name}' in extends`);
    }

    return super.extends({
      ...options,
      fields: Object.assign({}, this.fields, options.fields),
    });
  }

  toString(record) {
    return record
      ? record.get(this.idField, '')
      : '';
  }
}

export const BaseEntity = new Entity({
  name: 'BaseEntity',
  idField: 'uuid',
  skipStore: false,
  fields: {},
});

export const FilterEntity = BaseEntity.extends({
  name: 'FilterEntity',
  fields: {
    // page: Fields.NumberField.extends({
    //   default: 1,
    // }),
  },

  asParams(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`'record' option is required for entity '${this.name}' in asParams`);
    }

    return record
      .filter((value, key) => key in this.fields)
      .map((value, key) => this.fields[key].asParams({ value }))
      .filterNot(value => value === '');
  },
});
