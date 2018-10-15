import _isString from 'lodash/isString';
import { List, Map } from 'immutable';

import AnyField from './field-any';

// TODO update to entityid
// TODO add default clean to remove fields not in entity?
export default class EntityField extends AnyField {
  constructor(options = {}) {
    const defaults = {
      nested: true,
      type: 'entity',
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

  getId(value, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.name && !_isString(options.name)) throw new Error(`entity[${this.constructor.name}] (field.getId): "name" option must be either a string or undefined`);
      if (options.name && !this.getEntity(options).fields[options.name]) throw new Error(`entity[${this.constructor.name}] (field.getId): field "${options.name}" not found`);
    }

    return this.getField({ value, ...options })
      .getEntity({ value, ...options })
      .getId(this.getValue(value, options));
  }

  // TODO check if need to deprecate
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

  // TODO allow options name. check about isBlankSome, isBlankEvery allow name to be array?
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
    return this.getEntity({ value, ...options }).recordToData(value, options);
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

  // // TODO
  // validateDetail(errors = []) {
  //   return errors.reduce(
  //     (prev, current) => (
  //       Map.isMap(current)
  //         ? prev
  //           .withMutations(
  //             s => s
  //               .update('entityNonFields', list => list.concat(current.get('entityNonFields')))
  //               .update('entityFields', map => map),
  //           )
  //         : prev.update('entityNonFields', list => list.push(current))
  //     ),
  //     Map({
  //       entityFields: Map(),
  //       entityNonFields: List(),
  //     }),
  //   );
  // }
}
