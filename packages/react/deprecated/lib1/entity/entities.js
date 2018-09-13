import _isFunction from 'lodash/fp/isFunction';
import _mapValues from 'lodash/fp/mapValues';
import _omit from 'lodash/fp/omit';
import _pick from 'lodash/fp/pick';
import { Map, fromJS } from 'immutable';
import { compose } from 'redux';

import * as Fields from './fields';

export class Entity {
  static name = 'Entity';

  static idField = 'uuid';

  static fields = {};

  static cleaners = [];

  static actionReset(record) {
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static clean(record, options) {
    return this.cleaners.reduce(
      (cumm, cleaner) => cleaner(cumm, options),
      record,
    );
  }

  static dataToRecord(data = null) {
    const getDefaultFromField = field => (
      _isFunction(field.default)
        ? field.default()
        : field.default
    );

    const addDefaults = filteredData => compose(
      defaults => Object.assign({}, defaults, filteredData),
      _mapValues(getDefaultFromField),
      _omit(Object.keys(filteredData)),
    )(this.fields);

    return data && compose(
      fromJS,
      addDefaults,
      _pick(Object.keys(this.fields)),
    )(data);
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static toEntityField() {
    return new Fields.EntityField({
      entity: this,
    });
  }

  static toString(record) {
    return (record || Map()).get(this.idField, '');
  }

  static select(record, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) throw new Error('options as a 2nd argument is required when using Entity.select');
      if (!options.names || (Array.isArray(options.names) && options.names.length === 0)) throw new Error('\'names\' option is required when using Entity.select');
    }

    const names = Array.isArray(options.names) ? options.names : [options.names];
    const fields = names.filter(name => name in this.fields);

    return record.filter((_, key) => fields.includes(key));
  }
}


export class FilterEntity extends Entity {
  static name = 'FilterEntity';

  static fields = {
    page: new Fields.IntegerField(),
    size: new Fields.IntegerField(),
  };

  static asParams(record, options) {
    return (record || Map())
      .filter((value, key) => key in this.fields)
      .map((value, key) => this.fields[key].valueToParams(value, options))
      .flatten();
  }
}
