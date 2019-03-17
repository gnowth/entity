import _ from 'lodash';
import { fromJS, isImmutable, List, Map } from 'immutable';

import isRequired from '../validator/is-required';

export default class Field {
  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.options && !List.isList(options.options)) throw new Error(`Field.constructor (${this.constructor.name}): options.options must be a an immutable List`);
      if (options.options && options.options.size !== options.options.toSet().size) throw new Error(`Field.constructor (${this.constructor.name}): options.options must have unique items.`);
    }

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
      {
        validators: _.isFunction(options.validators)
          ? options.validators(defaults.validators)
          : (options.validators || defaults.validators),
      },
    );
  }

  clean(record, configs = {}) {
    const newOptions = { ...configs, field: this };

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

  getErrors(errors, configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (configs.name) throw new Error(`Field.getErrors (${this.constructor.name}): option "name" is not supported.`);
    }

    return errors;
  }

  getErrorsArray(errors, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.index === undefined) throw new Error(`Field.getErrorsArray (${this.constructor.name}): option "index" is required.`);
    }

    return errors
      .filter(error => Map.isMap(error) && error.get('list'))
      .flatMap(error => error.getIn(['errors', options.index]));
  }

  getField(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`Field.getField (${this.constructor.name}): method with option name is not supported.`);
    }

    return options.name ? null : this;
  }

  getId() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Field.getId (${this.constructor.name}): method is not supported.`);
    }
  }

  getKey(value) {
    return this.toString(value);
  }

  getOptions() {
    return this.options || List();
  }

  getValue(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`Field.getValue (${this.constructor.name}): option "name" is not supported.`);
    }

    return options.name ? null : value;
  }

  isBlank(value = null, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`Field.isBlank (${this.constructor.name}): method with option name is not supported.`);
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

  toString(value = null) {
    return value === null
      ? ''
      : value.toString();
  }

  validate(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.many && !List.isList(value)) throw new Error(`Field.validate (${this.constructor.name}-${options.fieldName}): "value" must be an "Immutable List" with field option "many"`);
    }

    const validators = _.isFunction(options.validators)
      ? options.validators(this.validators)
      : (options.validators || this.validators);

    return List(validators)
      .map(validator => validator(value, { ...options, field: this }))
      .filter(error => error);
  }
}
