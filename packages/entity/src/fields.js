import _isString from 'lodash/fp/isString';
import moment from 'moment';
import { List, Map, fromJS } from 'immutable';

import { mayNotBeBlank, entityValid } from './validators';

export class Field {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        blank: false,
        many: false,
        flags: {},
        cleaners: [],
        validators: [],
        listValidators: [],
      },
      options,
      {
        defaultValidators: [].concat(
          (!options.many && (!options.blank || options.flags)) ? [mayNotBeBlank] : [],
          options.defaultValidators || [],
        ),
        defaultListValidators: [].concat(
          (options.many && (!options.blank || options.flags)) ? [mayNotBeBlank] : [],
          options.defaultListValidators || [],
        ),
      },
    );

    this.validators = this.preventDefaultValidators
      ? this.validators
      : this.defaultValidators.concat(this.validators);

    this.listValidators = this.preventDefaultValidators
      ? this.listValidators
      : this.defaultListValidators.concat(this.listValidators);
  }

  asOptions() {
    return this.options.map(option => ({
      value: option,
      label: this.messages[option],
    }));
  }

  asParams(value = null, options) {
    if (value === null) return undefined;

    const values = this.many ? value : List([value]);

    return values
      .filterNot((v = null) => v === null)
      .map(v => this.valueToParam(v, options))
      .join(',');
  }

  clean(value, options) {
    const newOptions = Object.assign({}, options, { field: this });

    return this.cleaners.reduce(
      (cumm, cleaner) => cleaner(cumm, newOptions),
      value,
    );
  }

  dataToRecord(data = null) {
    if (List.isList(data)) {
      return data.map(this.dataToValue.bind(this));
    }

    return Array.isArray(data)
      ? List(data.map(this.dataToValue.bind(this)))
      : this.dataToValue(data);
  }

  dataToValue(data) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return data;
  }

  default() {
    return this.many ? List() : null;
  }

  getField({ name } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (name) throw new Error('entity (field.getField): field type does not support sub field');
    }

    return name ? null : this;
  }

  getOptions() {
    return this.options || List();
  }

  getValue(value, { name } = {}) { // eslint-disable-line class-methods-use-this
    if (process.env.NODE_ENV !== 'production') {
      if (name) throw new Error('entity (field.getValue): field type does not support sub field');
    }

    return name ? null : value;
  }

  isBlank(value = null) {
    return value === null || (
      this.many
        ? value.size === 0
        : value === ''
    );
  }

  isValid(value, options) {
    return this.validate(value, options).size === 0;
  }

  optionToString(option) {
    return this.messages[option] || '';
  }

  recordToData(record) {
    if (this.local) return undefined;

    return List.isList(record)
      ? record.map(this.valueToData.bind(this)).toArray()
      : this.valueToData(record);
  }

  toString(value = null) { // eslint-disable-line class-methods-use-this
    return value === null
      ? ''
      : value.toString();
  }

  validate(value, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.many && !List.isList(value)) throw new Error('Entity(validate): "value" must be an "Immutable List" with field option "many"');
    }

    const validateValue = (val, validators) => List(validators)
      .flatMap((validator) => {
        const errors = validator(val, Object.assign({}, options, { field: this }));
        const errorList = List.isList(errors) ? errors : List([errors]);

        return errorList
          .filter(error => error)
          .map((error) => {
            if (_isString(error)) return Map({ message: error });
            if (error === true) return Map({ message: 'Unidentified Error' });

            if (process.env.NODE_ENV !== 'production') {
              if (!Map.isMap(error)) throw new Error(`entity: Received error which is neither a "boolean" nor a "string" nor a "Map". Check the validators used in field with entity ${this.name}`);
            }

            return error;
          });
      });

    const errors = validateValue(value, this.many ? this.listValidators : this.validators);

    if (this.many) {
      const nestedErrors = value && value.map(v => validateValue(v, this.validators));

      return nestedErrors && nestedErrors.every(err => err.size === 0)
        ? errors
        : errors.push(Map({
          listError: true,
          message: this.errorListMessage,
          errors: nestedErrors,
        }));
    }

    return errors;
  }

  valueToParam(value = null) {
    if (value === null) return undefined;

    return this.toString(value);
  }

  valueToData(value) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return value;
  }
}

export class AnyField extends Field {
  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return fromJS(data);
  }

  valueToData(value) { // eslint-disable-line class-methods-use-this
    return (List.isList(value) || Map.isMap(value))
      ? value.toJS()
      : value;
  }
}

export class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error('"many" option is not supported for "IdField"');
    }
  }

  default() { // eslint-disable-line class-methods-use-this
    return undefined;
  }
}

export class TextField extends AnyField {
  static type = 'text';

  default() {
    return this.many ? List() : '';
  }
}

export class BooleanField extends AnyField {
  static type = 'boolean';
}

export class CharField extends TextField {
  static type = 'char';
}

export class DateField extends AnyField {
  static type = 'date';

  constructor(options) {
    const newOptions = Object.assign(
      {
        dateFormat: 'YYYY-MM-DD',
        allowTime: false,
      },
      options,
    );

    super(newOptions);
  }

  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return data && moment(data);
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.format(this.dateFormat);
  }

  valueToData(data) {
    return data && this.toString(data);
  }
}

export class DateTimeField extends DateField {
  constructor(options) {
    const newOptions = Object.assign(
      {
        dateFormat: 'YYYY-MM-DD HH:mm',
        allowTime: true,
      },
      options,
    );

    super(newOptions);
  }
}

export class NumberField extends AnyField { }

export class IntegerField extends NumberField {
  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    const value = parseInt(data, 10);

    return Number.isNaN(value) ? null : value;
  }
}

// TODO add default clean to remove fields not in entity
export class EntityField extends AnyField {
  static type = 'entity';

  constructor(options = {}) {
    super(Object.assign(
      {},
      options,
      !options.preventEntityValidators && {
        defaultValidators: [entityValid].concat(options.defaultValidators || []),
      },
    ));

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('\'entity\' option is required when extending EntityField');
    }
  }

  dataToValue(data) {
    return this.entity.dataToRecord(data);
  }

  default() {
    if (this.many) return List();

    return this.blank ? null : this.entity.dataToRecord({});
  }

  // TODO remove name as being an array?
  getField({ name } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (Array.isArray(name)) {
        if (name.length === 0) throw new Error('entity (field.getField): "name" option cannot be an empty array');
        if (name.some(n => !this.entity.fields[n])) throw new Error(`entity (field.getField): "name" ${name} contains name not describe in entity`);
      } else if (name !== undefined) {
        if (!_isString(name)) throw new Error(`entity (field.getField): "name" ${name} option must be either a string or an array of string`);
        if (!this.entity.fields[name]) throw new Error(`entity (field.getField): field "${name}" not found`);
      }
    }

    return name && !Array.isArray(name)
      ? this.entity.fields[name]
      : this;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterParams() {
    return Map();
  }

  getValue(record = null, { name } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (Array.isArray(name)) {
        if (name.length === 0) throw new Error('entity (field.getField): "name" argument cannot be an empty array');
        if (name.some(n => !this.entity.fields[n])) throw new Error(`entity (field.getField): "name" ${name} contains name not describe in entity`);
      } else if (name !== undefined && name !== null) {
        if (!_isString(name)) throw new Error(`entity (field.getField): "name" ${name} must be either a string or an array of string`);
        if (!this.entity.fields[name]) throw new Error(`entity (field.getField): field "${name}" not found`);
      }
    }

    if (Array.isArray(name)) {
      const fields = name.filter(n => n in this.entity.fields);

      return record && record.filter((_, key) => fields.includes(key));
    }

    return name && record
      ? record.get(name)
      : record;
  }

  getOptions() {
    return this.options || this.entity.options || List();
  }

  toString(value = null) {
    return value === null
      ? ''
      : this.entity.toString(value);
  }

  toStringOrdered(value = null) {
    return value === null
      ? ''
      : this.entity.toStringOrdered(value);
  }

  valueToData(value) {
    return this.entity.recordToData(value);
  }

  valueToParam(value = null) {
    return value === null
      ? undefined
      : value.get(this.entity.idField);
  }
}

export class EntityIdField extends EntityField {
  static type = 'entityid';

  constructor(options = {}) {
    super({
      ...options,
      preventEntityValidators: true,
    });

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('entity option is required when extending EntityIdField');
    }
  }

  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return fromJS(data);
  }

  default() { // eslint-disable-line class-methods-use-this
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterParamsId() {
    return Map();
  }

  valueToData(value) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return value;
  }

  valueToParam(value = null) {
    if (value === null) return undefined;

    return this.toString(value);
  }
}
