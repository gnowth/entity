// TODO add default clean to remove fields not in entity
export default class EntityField extends AnyField {
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

  getEntity() {
    return this.entity;
  }

  getEntityId(record, option) {
    return this.entity.getId(record, option);
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
