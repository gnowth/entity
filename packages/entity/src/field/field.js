// import _isFunction from 'lodash/isFunction';
import { fromJS, isImmutable, List } from 'immutable';

export default class Field {
  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.validatorsList && !options.many) throw new Error(`entity[${this.constructor.name}]: option "validatorsList" can only be set if "many" is set.`);
    }

    const defaults = {
      blank: false,
      cleaners: [],
      many: false,
      validators: [],
    };

    Object.assign(this, defaults, options);
  }

  // TODO check if need to deprecate
  asOptions() {
    return this.options.map(option => ({
      value: option,
      label: this.messages[option],
    }));
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
      if (options.name) throw new Error(`entity.fields[${this.constructor.name}] (getField): option "name" is not supported.`);
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

  // TODO check if need to deprecate
  optionToString(option) {
    return this.messages[option] || '';
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

  // // TODO filter errors === 0
  // validate(value, options = {}) {
  //   if (process.env.NODE_ENV !== 'production') {
  //     if (this.many && !List.isList(value)) throw new Error(`entity.fields[${this.constructor.name}] (validate): "value" must be an "Immutable List" with field option "many"`);
  //   }

  //   const maybeDetail = _isFunction(options.validators)
  //     ? options.validators(Array.isArray(this.validators) ? ({ detail: this.validators }) : this.validators)
  //     : (options.validators || this.validators);

  //   const validators = Array.isArray(maybeDetail)
  //     ? { detail: maybeDetail }
  //     : maybeDetail;

  //   return Map({
  //     detail: this.validateDetail(
  //       validators?.detail.map(
  //         validator => validator(value, options),
  //       ),
  //     ),

  //     list: validators.list && value.map(
  //       val => this.validateDetail(
  //         validators.list.map(
  //           validator => validator(val, options),
  //         ),
  //       ),
  //     ),
  //   }).filterNot(errors => errors?.size === 0);
  // }

  // validateDetail(errors) {
  //   return List(errors);
  // }
}
