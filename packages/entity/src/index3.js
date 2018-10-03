import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import moment from 'moment';
import { fromJS, isImmutable, List, Map } from 'immutable';

class Field {
  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.validatorsList && !options.many) throw new Error(`entity[Field]: option "validatorsList" can only be set if "many" is set for ${this.constructor.name}`);
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
    return fromJS(data);
  }

  default() {
    return this.many ? List() : null;
  }

  getEntity() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`entity[${this.constructor.name}] (getEntity): method is not supported for ${this.constructor.name}.`);
    }
  }

  getField(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity[${this.constructor.name}] (getField): method with option name is not supported for ${this.constructor.name}.`);
    }

    return options.name ? null : this;
  }

  getId() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`entity[Field] (getId): method is not supported for ${this.constructor.name}.`);
    }
  }

  getValue(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity[${this.constructor.name}] (getField): option "name" is not supported for ${this.constructor.name}.`);
      if (!options.value) throw new Error(`entity[${this.constructor.name}] (getField): option "value" is required for ${this.constructor.name}.`);
    }

    return options.name ? null : options.value;
  }

  isBlank(value = null) {
    return value === null || (
      this.many && value.size === 0
    );
  }

  toData(value) {
    return isImmutable(value)
      ? value.toJS()
      : value;
  }

  toParams(value) {
    return this.toString(value);
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.toString();
  }
}

class AnyField extends Field {}

class BooleanField extends AnyField {
  static type = 'boolean'
}

class CharField extends AnyField {
  static type = 'char'

  default() {
    return this.many ? List() : '';
  }
}

class DateField extends AnyField {
  static type = 'date'

  constructor(options) {
    const defaults = {
      dateFormat: 'YYYY-MM-DD',
      allowTime: false,
    };

    super(Object.assign(defaults, options));
  }

  dataToValue(data) {
    return data && moment(data);
  }

  toData(value) {
    return value && this.toString(value);
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.format(this.dateFormat);
  }
}

class DateTimeField extends DateField {
  constructor(options) {
    const defaults = {
      dateFormat: 'YYYY-MM-DD HH:mm',
      allowTime: true,
    };

    super(Object.assign(defaults, options));
  }
}

class EntityField extends AnyField {
  constructor(options = {}) {
    const defaults = {
      nested: true,
    };

    super(Object.assign(defaults, options));

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error(`entity[${this.constructor.name}]: "entity" option is required`);
    }
  }

  dataToValue(data) {
    return this.getEntity({ data }).dataToRecord(data);
  }

  default() {
    if (this.many) return List();

    return this.blank ? null : this.entity.dataToRecord({});
  }

  getEntity() {
    return this.entity;
  }

  getField(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getField): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getField): field "${options.name}" not found`);
    }

    return options.name
      ? this.getEntity(options).fields[options.name]
      : this;
  }

  getId(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
      if (!options.value) throw new Error(`entity[${this.constructor.name}] (getField): option "value" is required for ${this.constructor.name}.`);
    }

    return this.getField(options)
      .getEntity(options)
      .getId(this.getValue(options));
  }

  getValue(options = {}) { // TODO add value as position and pass it in option
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
      if (!options.value) throw new Error(`entity[${this.constructor.name}] (getField): option "value" is required for ${this.constructor.name}.`);
    }

    return options.name
      ? options.value.get(options.name)
      : options.value;
  }

  toString(value) { // TODO check if value can be position or must be key argument
  }
}

class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error('entity[IdField]: "many" option is not supported.');
    }
  }

  dataToValue(data) { // TODO maybe check if data can be converted into a string;
    return data?.toString();
  }

  default() {
    return undefined;
  }
}

class NumberField extends AnyField {}

class IntegerField extends NumberField {
  dataToValue(data) {
    const value = parseInt(data, 10);

    return Number.isNaN(value) ? null : value;
  }
}

class TextField extends CharField {
  static type = 'text'
}

class Entity {
  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true }),
  }

  static clean() {}

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

  static isEntity() {}

  static isEntityDescendant() {}

  static isValid() {}

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

  static validate() {}
}

class Base extends Entity {
  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be set.`);
      if (!List.isList(records)) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be an immutable list`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "index" option must be set`);
    }

    return records.delete(index);
  }

  static actionArrayMoveAtIndex() {}

  static actionReset(record) { // TODO check if reset should be reset to initialValue
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }
}

class Title extends Base {
  static urlBase = ''; // TODO add check that url is properly constructed in constructor

  static fields = {
    is_archived: new BooleanField({ default: false }),
    order: new IntegerField(),
    title: new CharField(),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true }),
  }

  static actionArchive(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'archive', method: 'post' },
      options,
    ));
  }

  static actionArrayDeleteAtIndexOrdered() {}

  static actionArrayMoveAtIndexOrdered() {}

  static actionSave(record) {
    return this.duck?.save(record, { invalidateList: true });
  }

  static toLink(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.urlBase) throw new Error(`entity[${this.name}] (toLink): "urlBase" must be set.`);
    }

    return `${this.urlBase}${this.getId(record)}`;
  }

  static toString(record) {
    return record?.get('title') || '';
  }

  static toStringOrdered(record) {
    return record
      ? `${record.get('order') + 1}. ${this.toString(record)}`
      : '';
  }

  static toUrlExport() {}
}

class Activity extends Title {
  static fields = {
    date_completed: new DateField(),
    date_due: new DateField(),
    date_submitted: new DateField(),
    is_archived: new BooleanField({ default: false }),
    is_completed: new BooleanField({ default: false }),
    is_draft: new BooleanField({ default: true }),
    order: new IntegerField(),
    title: new CharField(),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true }),
  }

  static actionComplete(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'complete', method: 'post' },
      options,
    ));
  }

  static actionSubmit(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'submit', method: 'post' },
      options,
    ));
  }

  static isCompleted() {}

  static isDraft() {}

  static isOverdue() {}
}

class Filter extends Entity {
  static fields = {
    page: new IntegerField({ default: 1 }),
    page_size: new IntegerField({ default: 20 }),
    uuid: new IdField({ blank: true }),
  }

  // Note(thierry): returning a map from field.toParams will flatten the output
  // TODO check that every output is a string/map/list
  // TODO check implementation of fieldValueToParams
  static toParams(record, options) {
    const fieldValueToParams = (value, key) => (
      List.isList(value)
        ? value
          .map(val => this.fields[key].toParams(val, Object.assign({ record }, options)))
          .reduce(
            (prev, param) => prev.mergeWith(
              (prevParam, nextParam) => (prevParam ? `${prevParam},${nextParam}` : nextParam),
              Map.isMap(param) ? param : Map({ [key]: param }),
            ),
            Map(),
          )
        : this.fields[key].toParams(value, Object.assign({ record }, options))
    );

    return record
      ? record
        .filter((_, key) => key in this.fields)
        .filterNot((_, key) => this.fields[key].local)
        .filterNot(value => value === undefined)
        .map(fieldValueToParams)
        .flatten()
      : Map();
  }
}

class Enum extends Entity {
  static idField = 'value'

  static fields = {
    label: new CharField(),
    value: new CharField(),
  }

  static toString(record) {
    return record?.get('label') || '';
  }
}
