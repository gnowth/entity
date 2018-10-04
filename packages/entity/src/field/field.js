import { fromJS, isImmutable, List } from 'immutable';

export default class Field {
  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.validatorsList && !options.many) throw new Error(`entity[Field]: option "validatorsList" can only be set if "many" is set for ${this.constructor.name}`);
    }

    const defaults = {
      blank: false,
      cleaners: [],
      many: false,
      validators: [],
      validatorsList: [],
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

  // TODO check if need to deprecate
  getOptions() {
    return this.options || List();
  }

  getValue(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name) throw new Error(`entity[${this.constructor.name}] (getField): option "name" is not supported for ${this.constructor.name}.`);
    }

    return options.name ? null : value;
  }

  // TODO allow options name. check about isBlankSome, isBlankEvery
  isBlank(value = null) {
    return value === null || (
      this.many && value.size === 0
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

  // TODO
  validate() {}
}
