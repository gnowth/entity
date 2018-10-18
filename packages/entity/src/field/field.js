import _isFunction from 'lodash/isFunction';
import { fromJS, isImmutable, List, Map } from 'immutable';

import isRequired from '../validator/is-required';

export default class Field {
  constructor(options = {}) {
    const defaults = {
      blank: false,
      cleaners: [],
      many: false,
      validators: options.blank ? [] : [isRequired],
    };

    Object.assign(
      this,
      defaults,
      options,
      { // TODO check how this is affected by subclass
        validators: _isFunction(options.validators)
          ? options.validators(defaults.validators)
          : (options.validators || defaults.validators),
      },
    );
  }

  clean(record, options) {
    const newOptions = Object.assign({ field: this }, options);

    return this.cleaners.reduce(
      (prev, cleaner) => cleaner(prev, newOptions),
      record,
    );
  }

  dataToValue(data) {
    return fromJS(data);
  }

  default() {
    return this.many ? List() : null;
  }

  getEntity() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`entity.fields[${this.constructor.name}] (getEntity): method is not supported.`);
    }
  }

  getErrors(errors, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      // TODO check that errors is a list
      // TODO check that index is a number
    }

    return options.index === undefined
      ? errors
      : errors
        .filter(error => Map.isMap(error) && error.get('list'))
        .flatMap(error => error.getIn(['errors', options.index]))
        .filter(error => error);
  }

  getErrorsArray(errors, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity.fields[${this.constructor.name}] (getErrors): option "name" is not supported.`);
    }

    return options.name ? List() : errors;
  }

  getField(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity.fields[${this.constructor.name}] (getField): method with option name is not supported.`);
    }

    return options.name ? null : this;
  }

  getId() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`entity.fields[${this.constructor.name}] (getId): method is not supported.`);
    }
  }

  // TODO check if need to deprecate
  getOptions() {
    return this.options || List();
  }

  getValue(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity.fields[${this.constructor.name}] (getValue): option "name" is not supported.`);
    }

    return options.name ? null : value;
  }

  isBlank(value = null, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity.fields[${this.constructor.name}] (isBlank): method with option name is not supported.`);
    }

    return value === null || (
      this.many
        ? value.size === 0
        : value === ''
    );
  }

  toData(value) {
    return isImmutable(value)
      ? value.toJS()
      : value;
  }

  toParams(value) {
    return value?.toString();
  }

  toString(value) {
    return value?.toString();
  }

  validate(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.many && !List.isList(value)) throw new Error(`entity.fields[${this.constructor.name}] (validate): "value" must be an "Immutable List" with field option "many"`);
    }

    const validators = _isFunction(options.validators)
      ? options.validators(this.validators)
      : (options.validators || this.validators);

    return List(validators)
      .map(validator => validator(value, { field: this, ...options }))
      .filter(error => error);
  }
}
