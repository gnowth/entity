import _isFunction from 'lodash/isFunction';
import { fromJS, List, Map } from 'immutable';

import EntityField from '../field/field-entity';
import IdField from '../field/field-id';

export default class Entity {
  static cleaners = []

  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true }),
  }

  static clean(record, options) {
    const newOptions = Object.assign({ entity: this }, options);

    return this.cleaners.reduce(
      (prev, cleaner) => cleaner(prev, newOptions),
      record,
    );
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

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isValid(value, options) {
    return this.validate(value, options).size === 0;
  }

  // TODO check if need to deprecate
  static optionToString(option) {
    return this.toString(fromJS(option));
  }

  static toData(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error(`entity[${this.name}] (toData): record must be either a Map or null or undefined`);
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
      if (record && !Map.isMap(record)) throw new Error(`entity[${this.name}] (toString): record must be either a Map or null or undefined`);
    }

    return record?.get(this.idField) || '';
  }

  // TODO
  static validate() {}
}
