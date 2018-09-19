import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/fp/mapValues';
import _omitBy from 'lodash/fp/omitBy';
import _omit from 'lodash/fp/omit';
import _pick from 'lodash/fp/pick';
import _compose from 'lodash/fp/compose';
import qs from 'query-string';
import moment from 'moment';
import { Map, fromJS } from 'immutable';
import settings from 'settings';

import * as Fields from './fields';

export class Entity {
  static idField = 'uuid';

  static urlBase = '';

  static fields = {};

  static cleaners = [];

  static clean(record, options) {
    const newOptions = Object.assign({}, options, { entity: this });

    return this.cleaners.reduce(
      (cumm, cleaner) => cleaner(cumm, newOptions),
      record,
    );
  }

  // TODO go though map?
  static dataToRecord(data = null) {
    if (Map.isMap(data)) return data;

    const getDefaultFromField = field => (
      _isFunction(field.default)
        ? field.default({ data, field })
        : field.default
    );

    const addDefaults = filteredData => _compose(
      defaults => Object.assign({}, defaults, filteredData),
      _mapValues(getDefaultFromField),
      _omit(Object.keys(filteredData)),
    )(this.fields);

    const dataToValue = filteredData => _compose(
      _mapValues.convert({ cap: false })(
        (field, key) => field.dataToRecord(filteredData[key], { data }),
      ),
      _pick(Object.keys(filteredData)),
    )(this.fields);

    return data && _compose(
      fromJS,
      addDefaults,
      dataToValue,
      _omitBy(value => value === undefined),
      _pick(Object.keys(this.fields)),
    )(data);
  }

  static getId(record, { name } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (name && !(this.fields[name] instanceof Fields.EntityField)) throw new Error(`entity (getId): The field for name "${name}" must be an instance of EntityField`);
    }

    return name
      ? record && this.fields[name].entity.getId(record.get(name))
      : record?.get(this.idField);
  }

  static getExportUrl(params) {
    const paramMap = params.remove('page').remove('page_size').filter(p => p) || Map();

    return `${settings.BASE_API_URL}${this.apiBase}?${qs.stringify(paramMap.toJS())}&format=xlsx`;
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isFieldBlank(record, { name, mapProps = {}, ...option }) {
    const newName = mapProps[name] || name;

    if (process.env.NODE_ENV !== 'production') {
      if (!(newName in this.fields)) throw new Error(`name '${newName}' must be a field in entity '${this.name}' when calling isFieldBlank`);
    }

    return record && this.fields[newName].isBlank(record.get(newName), option);
  }

  static isFieldBlankEvery(record, { names, mapProps = {}, ...option }) {
    if (process.env.NODE_ENV !== 'production') {
      if (!Array.isArray(names)) throw new Error(`names '${names}' must be of type array when calling "isFieldBlankSome" for entity '${this.name}'`);
      if (names.some(n => !this.fields[n])) throw new Error(`entity (isFieldBlankEvery): "names" ${names} contains name not describe in entity`);
    }

    const newNames = names.map(n => mapProps[n] || n);

    return record && newNames.every(name => this.fields[name].isBlank(record.get(name), option));
  }

  static isFieldBlankSome(record, { names, mapProps = {}, ...option }) {
    if (process.env.NODE_ENV !== 'production') {
      if (!Array.isArray(names)) throw new Error(`names '${names}' must be of type array when calling "isFieldBlankSome" for entity '${this.name}'`);
      if (names.some(n => !this.fields[n])) throw new Error(`entity (isFieldBlankSome): "names" ${names} contains name not describe in entity`);
    }

    const newNames = names.map(n => mapProps[n] || n);

    return record && newNames.some(name => this.fields[name].isBlank(record.get(name), option));
  }

  static isValid(value, options) {
    return this.validate(value, options).size === 0;
  }

  static optionToString(option) {
    return this.toString(fromJS(option));
  }

  static recordToData(record) {
    if (!Map.isMap(record)) return record;

    return record
      .filter((_, key) => key in this.fields)
      .map((value, key) => this.fields[key].recordToData(value))
      .toObject();
  }

  // will be deprecated ?
  static select(record, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) throw new Error('options as a 2nd argument is required when using Entity.select');
      if (!options.name || (Array.isArray(options.name) && options.name.length === 0)) throw new Error('\'name\' option is required when using Entity.select');
    }

    if (Array.isArray(options.name)) {
      const fields = options.name.filter(n => n in this.fields);

      return record && record.filter((_, key) => fields.includes(key));
    }

    return record && record.get(options.name);
  }

  static toEntityField(options) {
    return new Fields.EntityField(Object.assign(
      { entity: this },
      options,
    ));
  }

  static toLink(record) {
    return `${this.urlBase}${this.getId(record)}`;
  }

  static toString(record) {
    return (record || Map()).get(this.idField, '');
  }

  static toStringOrdered(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`entity (toStringOrdered): Your entity ${this.name} must contain the "order" field`);
    }

    return record
      ? `${record.get('order') + 1}. ${this.toString(record)}`
      : '';
  }

  static validate(record, options = {}) {
    return record && Map(options.fields ? _pick(options.fields)(this.fields) : this.fields)
      .map((field, name) => field.validate(
        record.get(name),
        Object.assign({}, _omit(['fields'])(options), { record, field, name, formEntity: this }),
      ))
      .filterNot(errors => errors.size === 0);
  }
}

// TODO add temp uuid
export class BaseEntity extends Entity {
  static name = 'BaseEntity';

  static actionArchive(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`'record' must be set when calling actionArchive on entity ${this.name}`);
    }

    return record.set('is_archived', true);
  }

  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`'records' must be set when calling actionArrayDeleteAtIndex on entity ${this.name}`);
      if (index === null) throw new Error(`'index' option must be set when calling actionArrayDeleteAtIndex on entity ${this.name}`);
    }

    return records.delete(index);
  }

  static actionArrayDeleteAtIndexOrdered(records, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`Entity (actionArrayDeleteAtIndexOrdered): Entity ${this.name} must have a field order`);
    }

    return this.actionArrayDeleteAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndex(records, { index = null, indexTo = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`'records' must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
      if (index === null) throw new Error(`'index' option must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
      if (indexTo === null) throw new Error(`'indexTo' option must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
    }

    return records.delete(index).insert(indexTo, records.get(index));
  }


  static actionArrayMoveAtIndexOrdered(records, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`Entity (actionArrayDeleteAtIndexOrdered): Entity ${this.name} must have a field order`);
    }

    return this.actionArrayMoveAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionComplete(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionComplete): 'record' must be set. Ref: entity ${this.name}`);
      if (!this.fields.completed) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "completed"`);
    }

    return record.set('completed', true);
  }

  static actionReset(record) {
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static actionSave(record) {
    return this.duck.save(record, { invalidateList: true });
  }

  static actionSubmit(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionSubmit): 'record' must be set. Ref: entity ${this.name}`);
    }

    return record.set('is_draft', false);
  }

  static isOverdue(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionComplete): 'record' must be set. Ref: entity ${this.name}`);
      if (!this.fields.due_date) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "due_date"`);
      if (!this.fields.is_draft) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "is_draft"`);
    }

    return record.get('is_draft') && record.get('due_date').isBefore(moment(), 'day');
  }
}

export class FilterEntity extends BaseEntity {
  static name = 'FilterEntity';

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

export class TitleEntity extends BaseEntity {
  static name = 'TitleEntity';

  static fields = {
    uuid: new Fields.IdField({ blank: true }),
    title: new Fields.CharField(),
    title_short: new Fields.CharField({ blank: true }),
    is_archived: new Fields.BooleanField({ default: false }),
  };

  static toString(record) {
    return (record || Map()).get('title', '');
  }
}

export class EnumEntity extends BaseEntity {
  static idField = 'value';

  static fields = {
    value: new Fields.CharField(),
    label: new Fields.CharField(),
  };

  static toString(record) {
    return record.get('label');
  }
}
