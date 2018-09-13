// /* eslint-disable class-methods-use-this */
import { List } from 'immutable';

export class Field {
  constructor(options) {
    this.blank = false;
    this.multi = false;

    Object.assign(this, options);
  }

  default() {
    return this.multi ? List() : null;
  }

  isBlank(value = null) {
    return value === null || this.multi
      ? value.size === 0
      : value === '';
  }

  valueToParams(value) {
    return this.multi
      ? (value || List()).map(v => v?.toString()).join(',')
      : value?.toString();
  }
}


export class AnyField extends Field {}


export class TextField extends AnyField {
  default() {
    return this.multi ? List() : '';
  }
}


export class CharField extends TextField {}


export class NumberField extends AnyField {}


export class IntegerField extends NumberField {}


export class EntityField extends AnyField {
  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('\'entity\' option is required when extending EntityField');
    }
  }

  default() {
    if (this.multi) return List();

    return this.blank ? null : this.entity.dataToRecord({});
  }

  valueToParams(value) {
    return value?.get(this.entity.idField);
  }
}
