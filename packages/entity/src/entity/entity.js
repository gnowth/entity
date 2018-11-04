import _isFunction from 'lodash/isFunction';
import { List, Map } from 'immutable';

import EntityField from '../field/field-entity';
import IdField from '../field/field-id';

export default class Entity {
  static cleaners = []

  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true }),
  }

  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be set.`);
      if (!List.isList(records)) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be an immutable list`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "index" option must be set`);
    }

    return records.delete(index);
  }

  static actionArrayMoveAtIndex(records, { index = null, indexTo = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "records" must be set.`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "index" option must be set.`);
      if (indexTo === null) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "indexTo" option must be set.`);
    }

    return records.delete(index).insert(indexTo, records.get(index));
  }

  // TODO check if reset should be reset to initialValue
  static actionReset(record) {
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
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
      (List.isList(value) || Array.isArray(value))
        ? List(value).map(val => this.fields[key].dataToValue(val, { data }))
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

  // TODO check if some code rely on id to be an empty string ''
  static getId(record) {
    return record?.get(this.idField);
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isValid(record, options) {
    return this.validate(record, options).size === 0;
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

  // TODO FYI because entity-valid is calling this function, this should return only 1 error. unless we change entityvalid
  // but if we remove nonField from here, we won't have non field errors?
  static validate(record, options = {}) {
    if (!record) return record;

    const detailErrors = Map(this.fields)
      .filter((field, key) => !options.fields || options.fields[key])
      .map((field, key) => field.validate(
        record.get(key),
        {
          ...options,
          fieldName: key,
          record,
          validators: options.fields && options.fields[key],
        },
      )).filterNot(errors => errors.size === 0);

    return detailErrors.size === 0
      ? null
      : Map({
        detail: true,
        message: 'Invalid Entity', // TODO add proper message
        errors: detailErrors,
      });
  }
}

// const errors = [
//   'error',
//   true,
//   {
//     defaultMessage: 'dfhdf',
//     id: 'df',
//   },
//   {
//     detail: true,
//     messageId: 'df',
//     messageLocale: {
//       defaultMessage: 'dfhdf',
//       id: 'df',
//     },
//     message: 'error',
//     errors: {
//       titles: [
//         'error',
//         true,
//         {
//           list: true,
//           errors: [[], []],
//         },
//       ]
//     },
//   },
// ];
