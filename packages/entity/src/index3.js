import _isFunction from 'lodash/isFunction';
import { List, Map } from 'immutable';

class Field {
  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.validatorsList && !options.many) throw new Error('entity (Field): option "validatorsList" can only be set if "many" is set');
    }

    const defaults = {
      blank: false,
      many: false,
      validators: [],
      validatorsList: [],
    };

    Object.assign(this, defaults, options);
  }

  dataToValue(data) {
    return data;
  }

  default() {
    return this.many ? List() : null;
  }

  isBlank(value = null) {
    return value === null || (
      this.many && value.size === 0
    );
  }

  toData(value) {
    return value;
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.toString();
  }
}

class AnyField extends Field {}

class EntityField extends AnyField {
  default() {
    if (this.many) return List();

    return this.blank ? null : this.entity.dataToRecord({});
  }
}

class IdField extends AnyField {
  dataToValue(data) { // TODO maybe check if data can be converted into a string;
    return data?.toString();
  }

  default() {
    return undefined;
  }
}

class Entity {
  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true }),
  }

  static dataToRecord(data = null) {
    const fieldDataToValue = (value, key) => (
      (List.isList(data) || Array.isArray(data))
        ? List(data).map(val => this.fields[key].dataToValue(val, { data }))
        : this.fields[key].dataToValue(value, { data })
    );

    const getDefaultFromField = field => (
      _isFunction(field.default)
        ? field.default({ data })
        : field.default
    );

    const values = Map(data)
      .filter((_, key) => key in this.fields)
      .filterNot(value => value === undefined)
      .map(fieldDataToValue);

    return data && Map(this.fields)
      .filter((_, key) => data[key] === undefined)
      .map(getDefaultFromField)
      .merge(values);
  }

  static getEntityField(options) {
    return new EntityField(Object.assign(
      { entity: this },
      options,
    ));
  }

  static getId(record) {
    return record?.get(this.idField) || '';
  }

  static toData(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error('entity (toData): record must be either a Map or null or undefined');
    }

    const fieldValueToData = (value, key) => (
      List.isList(value)
        ? value.map(val => this.fields[key].toData(val, { record })).toArray()
        : this.fields[key].toData(value, { record })
    );

    return record && record
      .filter((_, key) => key in this.fields)
      .filterNot((_, key) => this.fields[key].local)
      .map(fieldValueToData)
      .toObject();
  }

  static toString(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error('entity (toString): record must be either a Map or null or undefined');
    }

    return record?.get(this.idField) || '';
  }
}
