import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import { List, Map } from 'immutable';

import AnyField from './field-any';
import entityValid from '../validator/entity-valid';
import list from '../validator/list';

export default class EntityField extends AnyField {
  constructor(options = {}) {
    const defaults = {
      nested: true,
      type: 'entity',
    };

    const entityValidators = options.many
      ? [list([entityValid])]
      : [entityValid];

    super(Object.assign(
      defaults,
      options,
      {
        validators: defaultValidators => (
          _isFunction(options.validators)
            ? options.validators(defaultValidators.concat(entityValidators))
            : options.validators || defaultValidators.concat(entityValidators)
        ),
      },
    ));

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error(`${this.constructor.name}.constructor: "entity" option is required`);
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

  getErrors(errors, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`EntityField.getErrors (${this.entity.name}): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`EntityField.getErrors (${this.entity.name}): field "${options.name}" not found`);
    }

    return options.name
      ? errors
        .filter(error => Map.isMap(error) && error.get('detail'))
        .flatMap(error => error.getIn(['errors', options.name]))
        .filter(error => error)
      : errors;
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

  getId(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
    }

    return this.getField({ value, ...options })
      .getEntity({ value, ...options })
      .getId(this.getValue(value, options));
  }

  getKey(value) {
    return this.getId(value);
  }

  getOptions() {
    return this.options || this.entity.options || List();
  }

  getValue(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
    }

    return options.name
      ? value?.get(options.name)
      : value;
  }

  isBlank(value = null, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
    }

    return value === null || (
      this.many
        ? value.size === 0
        : value === ''
    );
  }

  toData(value, options = {}) {
    return this.getEntity({ value, ...options }).toData(value, options);
  }

  valueToParam(value = null) {
    return value === null
      ? undefined
      : value.get(this.entity.idField);
  }

  toParams(value, options) {
    return this.getId(value, options);
  }

  toString(value, options = {}) {
    return this.getEntity({ value, ...options }).toString(value, options);
  }
}
