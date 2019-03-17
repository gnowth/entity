import _ from 'lodash';
import { List, Map } from 'immutable';

import EntityField from '../field/field-entity';
import IdField from '../field/field-id';

export default class Entity {
  static cleaners = []

  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true, mock: 'random.uuid' }),
  }

  static paths = {}

  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!List.isList(records)) throw new Error(`Entity.actionArrayDeleteAt (${this.name}): "records" must be an immutable List.`);
      if (index === null) throw new Error(`Entity.actionArrayDeleteAt (${this.name}): "index" option must be set.`);
    }

    return records.delete(index);
  }

  static actionArrayMoveAtIndex(records, { index = null, indexTo = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!List.isList(records)) throw new Error(`Entity.actionArrayMoveAtIndex (${this.name}): "records" must be an immutable List.`);
      if (index === null) throw new Error(`Entity.actionArrayMoveAtIndex (${this.name}): "index" option must be set.`);
      if (indexTo === null) throw new Error(`Entity.actionArrayMoveAtIndex (${this.name}): "indexTo" option must be set.`);
    }

    return records.delete(index).insert(indexTo, records.get(index));
  }

  static actionReset(record, configs = {}) {
    return configs.valueInitial || this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static clean(record, configs = {}) {
    const newOptions = { ...configs, entity: this };

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
      _.isFunction(field.default)
        ? field.default({ data })
        : field.default
    );

    const values = Map(data)
      .filter((value, key) => key in this.fields)
      .filterNot(value => value === undefined)
      .map(fieldDataToValue);

    return data && Map(this.fields)
      .filter((value, key) => data[key] === undefined)
      .map(getDefaultFromField)
      .merge(values);
  }

  static getEntityField(configs = {}) {
    return new EntityField({ entity: this, ...configs });
  }

  static getId(record) {
    return record?.get(this.idField);
  }

  static getPaths() {
    return this.paths;
  }

  static getSize() {
    return 0;
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isValid(record, configs) {
    return this.validate(record, configs).size === 0;
  }

  static isValidFromErrors(errors, configs = {}) {
    return configs.name
      ? configs.name.some(
        n => errors
          .filter(error => Map.isMap(error) && error.get('detail'))
          .flatMap(error => error.getIn(['errors', n]))
          .filter(error => error).size > 0,
      )
      : !errors || errors.size === 0;
  }

  static mock(faker, index, mockData) {
    return _.flowRight(
      record => this.toData(record),
      data => this.dataToRecord(data),
      fields => ({
        ..._.mapValues(
          fields,
          (field) => {
            if (field instanceof EntityField && !field.blank && field.entity.store) {
              return field.many
                ? _.sampleSize(Object.values(field.entity.store))
                : _.sample(Object.values(field.entity.store));
            }

            return field.mock && (
              field.mock === 'index'
                ? index
                : _.get(faker, field.mock)(...(field.mockConfigs || []))
            );
          },
        ),
        ...mockData,
      }),
    )(this.fields);
  }

  static mockMany(faker, configs = {}) {
    return _.keyBy(
      _.range(configs.size).map(index => this.mock(faker, index)),
      this.idField,
    );
  }

  static toData(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error(`Entity.toData (${this.name}): record must be either a Map or null or undefined`);
    }

    const fieldValueToData = (value, key) => (
      List.isList(value)
        ? value.map(val => this.fields[key].toData(val, { record })).toArray()
        : this.fields[key].toData(value, { record })
    );

    return record && record
      .filter((value, key) => key in this.fields)
      .filterNot((value, key) => this.fields[key].local)
      .map(fieldValueToData)
      .toObject();
  }

  static toString(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error(`Entity.toString (${this.name}): record must be either a Map or null or undefined`);
    }

    return record?.get(this.idField) || '';
  }

  static validate(record, configs = {}) {
    if (!record) return record;

    const detailErrors = Map(this.fields)
      .filter((field, key) => !configs.fields || configs.fields[key])
      .map((field, key) => field.validate(
        record.get(key),
        {
          ...configs,
          fieldName: key,
          record,
          validators: configs.fields && configs.fields[key],
        },
      )).filterNot(errors => errors.size === 0);

    return detailErrors.size === 0
      ? null
      : Map({
        detail: true,
        message: 'Invalid Entity',
        errors: detailErrors,
      });
  }
}
