'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.regexp.flags');
var _isFunction = _interopDefault(require('lodash/fp/isFunction'));
var immutable = require('immutable');
require('core-js/modules/es6.regexp.to-string');
var _isString = _interopDefault(require('lodash/fp/isString'));
var moment = _interopDefault(require('moment'));
require('core-js/modules/web.dom.iterable');
var _mapValues = _interopDefault(require('lodash/fp/mapValues'));
var _omitBy = _interopDefault(require('lodash/fp/omitBy'));
var _omit = _interopDefault(require('lodash/fp/omit'));
var _pick = _interopDefault(require('lodash/fp/pick'));
var _compose = _interopDefault(require('lodash/fp/compose'));
var qs = _interopDefault(require('query-string'));
var settings = _interopDefault(require('settings'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const allowBlank = () => false;
const isRequired = (value, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('entity (Validators.isRequired): "field" option is required');
  }

  return options.field.isBlank(value, options) && 'May not be blank';
};
const entityValid = (value, options = {}) => {
  const errors = options.field.entity.validate(value, options);
  return !!errors && errors.size > 0 && immutable.Map({
    errors,
    message: options.field.errorMessage,
    entityError: true
  });
};
const mayNotBeBlank = (value, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('"field" option is required when calling "mayNotBeBlank"');
  }

  const validator = options.flag && options.field.flags[options.flag];
  const defaultError = !options.field.blank && isRequired(value, options);
  if (!validator) return defaultError;
  const flagError = validator(value, options);
  return defaultError ? flagError && defaultError : flagError && 'May not be blank';
};
const isRequiredIf = predicate => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('Validators (isRequiredIf): predicate argument must be of type function');
  }

  return predicate(_objectSpread({
    value
  }, options)) && isRequired(value, options);
};

var AllValidators = /*#__PURE__*/Object.freeze({
  allowBlank: allowBlank,
  isRequired: isRequired,
  entityValid: entityValid,
  mayNotBeBlank: mayNotBeBlank,
  isRequiredIf: isRequiredIf
});

class Field {
  constructor(options = {}) {
    Object.assign(this, {
      blank: false,
      many: false,
      flags: {},
      cleaners: [],
      validators: [],
      listValidators: []
    }, options, {
      defaultValidators: [].concat(!options.many && (!options.blank || options.flags) ? [mayNotBeBlank] : [], options.defaultValidators || []),
      defaultListValidators: [].concat(options.many && (!options.blank || options.flags) ? [mayNotBeBlank] : [], options.defaultListValidators || [])
    });
    this.validators = this.preventDefaultValidators ? this.validators : this.defaultValidators.concat(this.validators);
    this.listValidators = this.preventDefaultValidators ? this.listValidators : this.defaultListValidators.concat(this.listValidators);
  }

  asOptions() {
    return this.options.map(option => ({
      value: option,
      label: this.messages[option]
    }));
  }

  asParams(value = null, options) {
    if (value === null) return undefined;
    const values = this.many ? value : immutable.List([value]);
    return values.filterNot((v = null) => v === null).map(v => this.valueToParam(v, options)).join(',');
  }

  clean(value, options) {
    const newOptions = Object.assign({}, options, {
      field: this
    });
    return this.cleaners.reduce((cumm, cleaner) => cleaner(cumm, newOptions), value);
  }

  dataToRecord(data = null) {
    if (immutable.List.isList(data)) {
      return data.map(this.dataToValue.bind(this));
    }

    return Array.isArray(data) ? immutable.List(data.map(this.dataToValue.bind(this))) : this.dataToValue(data);
  }

  dataToValue(data) {
    // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return data;
  }

  default() {
    return this.many ? immutable.List() : null;
  }

  getField({
    name
  } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (name) throw new Error('entity (field.getField): field type does not support sub field');
    }

    return name ? null : this;
  }

  getOptions() {
    return this.options || immutable.List();
  }

  getValue(value, {
    name
  } = {}) {
    // eslint-disable-line class-methods-use-this
    if (process.env.NODE_ENV !== 'production') {
      if (name) throw new Error('entity (field.getValue): field type does not support sub field');
    }

    return name ? null : value;
  }

  isBlank(value = null) {
    return value === null || (this.many ? value.size === 0 : value === '');
  }

  isValid(value, options) {
    return this.validate(value, options).size === 0;
  }

  optionToString(option) {
    return this.messages[option] || '';
  }

  recordToData(record) {
    if (this.local) return undefined;
    return immutable.List.isList(record) ? record.map(this.valueToData.bind(this)).toArray() : this.valueToData(record);
  }

  toString(value = null) {
    // eslint-disable-line class-methods-use-this
    return value === null ? '' : value.toString();
  }

  validate(value, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.many && !immutable.List.isList(value)) throw new Error('Entity(validate): "value" must be an "Immutable List" with field option "many"');
    }

    const validateValue = (val, validators) => immutable.List(validators).flatMap(validator => {
      const errors = validator(val, Object.assign({}, options, {
        field: this
      }));
      const errorList = immutable.List.isList(errors) ? errors : immutable.List([errors]);
      return errorList.filter(error => error).map(error => {
        if (_isString(error)) return immutable.Map({
          message: error
        });
        if (error === true) return immutable.Map({
          message: 'Unidentified Error'
        });

        if (process.env.NODE_ENV !== 'production') {
          if (!immutable.Map.isMap(error)) throw new Error(`entity: Received error which is neither a "boolean" nor a "string" nor a "Map". Check the validators used in field with entity ${this.name}`);
        }

        return error;
      });
    });

    const errors = validateValue(value, this.many ? this.listValidators : this.validators);

    if (this.many) {
      const nestedErrors = value && value.map(v => validateValue(v, this.validators));
      return nestedErrors && nestedErrors.every(err => err.size === 0) ? errors : errors.push(immutable.Map({
        listError: true,
        message: this.errorListMessage,
        errors: nestedErrors
      }));
    }

    return errors;
  }

  valueToParam(value = null) {
    if (value === null) return undefined;
    return this.toString(value);
  }

  valueToData(value) {
    // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return value;
  }

}
class AnyField extends Field {
  dataToValue(data = null) {
    // eslint-disable-line class-methods-use-this
    return immutable.fromJS(data);
  }

  valueToData(value) {
    // eslint-disable-line class-methods-use-this
    return immutable.List.isList(value) || immutable.Map.isMap(value) ? value.toJS() : value;
  }

}
class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error('"many" option is not supported for "IdField"');
    }
  }

  default() {
    // eslint-disable-line class-methods-use-this
    return undefined;
  }

}
class TextField extends AnyField {
  default() {
    return this.many ? immutable.List() : '';
  }

}

_defineProperty(TextField, "type", 'text');

class BooleanField extends AnyField {}

_defineProperty(BooleanField, "type", 'boolean');

class CharField extends TextField {}

_defineProperty(CharField, "type", 'char');

class DateField extends AnyField {
  constructor(options) {
    const newOptions = Object.assign({
      dateFormat: 'YYYY-MM-DD',
      allowTime: false
    }, options);
    super(newOptions);
  }

  dataToValue(data = null) {
    // eslint-disable-line class-methods-use-this
    return data && moment(data);
  }

  toString(value = null) {
    return value === null ? '' : value.format(this.dateFormat);
  }

  valueToData(data) {
    return data && this.toString(data);
  }

}

_defineProperty(DateField, "type", 'date');

class DateTimeField extends DateField {
  constructor(options) {
    const newOptions = Object.assign({
      dateFormat: 'YYYY-MM-DD HH:mm',
      allowTime: true
    }, options);
    super(newOptions);
  }

}
class NumberField extends AnyField {}
class IntegerField extends NumberField {
  dataToValue(data = null) {
    // eslint-disable-line class-methods-use-this
    const value = parseInt(data, 10);
    return Number.isNaN(value) ? null : value;
  }

} // TODO add default clean to remove fields not in entity

class EntityField extends AnyField {
  constructor(options = {}) {
    super(Object.assign({}, options, !options.preventEntityValidators && {
      defaultValidators: [entityValid].concat(options.defaultValidators || [])
    }));

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('\'entity\' option is required when extending EntityField');
    }
  }

  dataToValue(data) {
    return this.entity.dataToRecord(data);
  }

  default() {
    if (this.many) return immutable.List();
    return this.blank ? null : this.entity.dataToRecord({});
  } // TODO remove name as being an array?


  getField({
    name
  } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (Array.isArray(name)) {
        if (name.length === 0) throw new Error('entity (field.getField): "name" option cannot be an empty array');
        if (name.some(n => !this.entity.fields[n])) throw new Error(`entity (field.getField): "name" ${name} contains name not describe in entity`);
      } else if (name !== undefined) {
        if (!_isString(name)) throw new Error(`entity (field.getField): "name" ${name} option must be either a string or an array of string`);
        if (!this.entity.fields[name]) throw new Error(`entity (field.getField): field "${name}" not found`);
      }
    }

    return name && !Array.isArray(name) ? this.entity.fields[name] : this;
  } // eslint-disable-next-line class-methods-use-this


  getFilterParams() {
    return immutable.Map();
  }

  getValue(record = null, {
    name
  } = {}) {
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

    return name && record ? record.get(name) : record;
  }

  getOptions() {
    return this.options || this.entity.options || immutable.List();
  }

  toString(value = null) {
    return value === null ? '' : this.entity.toString(value);
  }

  toStringOrdered(value = null) {
    return value === null ? '' : this.entity.toStringOrdered(value);
  }

  valueToData(value) {
    return this.entity.recordToData(value);
  }

  valueToParam(value = null) {
    return value === null ? undefined : value.get(this.entity.idField);
  }

}

_defineProperty(EntityField, "type", 'entity');

class EntityIdField extends EntityField {
  constructor(options = {}) {
    super(_objectSpread({}, options, {
      preventEntityValidators: true
    }));

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('entity option is required when extending EntityIdField');
    }
  }

  dataToValue(data = null) {
    // eslint-disable-line class-methods-use-this
    return immutable.fromJS(data);
  }

  default() {
    // eslint-disable-line class-methods-use-this
    return undefined;
  } // eslint-disable-next-line class-methods-use-this


  getFilterParamsId() {
    return immutable.Map();
  }

  valueToData(value) {
    // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return value;
  }

  valueToParam(value = null) {
    if (value === null) return undefined;
    return this.toString(value);
  }

}

_defineProperty(EntityIdField, "type", 'entityid');

var AllFields = /*#__PURE__*/Object.freeze({
  Field: Field,
  AnyField: AnyField,
  IdField: IdField,
  TextField: TextField,
  BooleanField: BooleanField,
  CharField: CharField,
  DateField: DateField,
  DateTimeField: DateTimeField,
  NumberField: NumberField,
  IntegerField: IntegerField,
  EntityField: EntityField,
  EntityIdField: EntityIdField
});

class Entity {
  static clean(record, options) {
    const newOptions = Object.assign({}, options, {
      entity: this
    });
    return this.cleaners.reduce((cumm, cleaner) => cleaner(cumm, newOptions), record);
  } // TODO go though map?


  static dataToRecord(data = null) {
    if (immutable.Map.isMap(data)) return data;

    const getDefaultFromField = field => _isFunction(field.default) ? field.default({
      data,
      field
    }) : field.default;

    const addDefaults = filteredData => _compose(defaults => Object.assign({}, defaults, filteredData), _mapValues(getDefaultFromField), _omit(Object.keys(filteredData)))(this.fields);

    const dataToValue = filteredData => _compose(_mapValues.convert({
      cap: false
    })((field, key) => field.dataToRecord(filteredData[key], {
      data
    })), _pick(Object.keys(filteredData)))(this.fields);

    return data && _compose(immutable.fromJS, addDefaults, dataToValue, _omitBy(value => value === undefined), _pick(Object.keys(this.fields)))(data);
  }

  static getId(record, {
    name
  } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (name && !(this.fields[name] instanceof EntityField)) throw new Error(`entity (getId): The field for name "${name}" must be an instance of EntityField`);
    }

    return name ? record && this.fields[name].entity.getId(record.get(name)) : record === null || record === void 0 ? void 0 : record.get(this.idField);
  }

  static getExportUrl(params) {
    const paramMap = params.remove('page').remove('page_size').filter(p => p) || immutable.Map();
    return `${settings.BASE_API_URL}${this.apiBase}?${qs.stringify(paramMap.toJS())}&format=xlsx`;
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isFieldBlank(record, _ref) {
    let name = _ref.name,
        _ref$mapProps = _ref.mapProps,
        mapProps = _ref$mapProps === void 0 ? {} : _ref$mapProps,
        option = _objectWithoutProperties(_ref, ["name", "mapProps"]);

    const newName = mapProps[name] || name;

    if (process.env.NODE_ENV !== 'production') {
      if (!(newName in this.fields)) throw new Error(`name '${newName}' must be a field in entity '${this.name}' when calling isFieldBlank`);
    }

    return record && this.fields[newName].isBlank(record.get(newName), option);
  }

  static isFieldBlankEvery(record, _ref2) {
    let names = _ref2.names,
        _ref2$mapProps = _ref2.mapProps,
        mapProps = _ref2$mapProps === void 0 ? {} : _ref2$mapProps,
        option = _objectWithoutProperties(_ref2, ["names", "mapProps"]);

    if (process.env.NODE_ENV !== 'production') {
      if (!Array.isArray(names)) throw new Error(`names '${names}' must be of type array when calling "isFieldBlankSome" for entity '${this.name}'`);
      if (names.some(n => !this.fields[n])) throw new Error(`entity (isFieldBlankEvery): "names" ${names} contains name not describe in entity`);
    }

    const newNames = names.map(n => mapProps[n] || n);
    return record && newNames.every(name => this.fields[name].isBlank(record.get(name), option));
  }

  static isFieldBlankSome(record, _ref3) {
    let names = _ref3.names,
        _ref3$mapProps = _ref3.mapProps,
        mapProps = _ref3$mapProps === void 0 ? {} : _ref3$mapProps,
        option = _objectWithoutProperties(_ref3, ["names", "mapProps"]);

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
    return this.toString(immutable.fromJS(option));
  }

  static recordToData(record) {
    if (!immutable.Map.isMap(record)) return record;
    return record.filter((_, key) => key in this.fields).map((value, key) => this.fields[key].recordToData(value)).toObject();
  } // will be deprecated ?


  static select(record, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) throw new Error('options as a 2nd argument is required when using Entity.select');
      if (!options.name || Array.isArray(options.name) && options.name.length === 0) throw new Error('\'name\' option is required when using Entity.select');
    }

    if (Array.isArray(options.name)) {
      const fields = options.name.filter(n => n in this.fields);
      return record && record.filter((_, key) => fields.includes(key));
    }

    return record && record.get(options.name);
  }

  static toEntityField(options) {
    return new EntityField(Object.assign({
      entity: this
    }, options));
  }

  static toLink(record) {
    return `${this.urlBase}${this.getId(record)}`;
  }

  static toString(record) {
    return (record || immutable.Map()).get(this.idField, '');
  }

  static toStringOrdered(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`entity (toStringOrdered): Your entity ${this.name} must contain the "order" field`);
    }

    return record ? `${record.get('order') + 1}. ${this.toString(record)}` : '';
  }

  static validate(record, options = {}) {
    return record && immutable.Map(options.fields ? _pick(options.fields)(this.fields) : this.fields).map((field, name) => field.validate(record.get(name), Object.assign({}, _omit(['fields'])(options), {
      record,
      field,
      name,
      formEntity: this
    }))).filterNot(errors => errors.size === 0);
  }

} // TODO add temp uuid

_defineProperty(Entity, "idField", 'uuid');

_defineProperty(Entity, "urlBase", '');

_defineProperty(Entity, "fields", {});

_defineProperty(Entity, "cleaners", []);

class BaseEntity extends Entity {
  static actionArchive(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`'record' must be set when calling actionArchive on entity ${this.name}`);
    }

    return record.set('is_archived', true);
  }

  static actionArrayDeleteAtIndex(records, {
    index = null
  } = {}) {
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

    return this.actionArrayDeleteAtIndex(records, options).map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndex(records, {
    index = null,
    indexTo = null
  } = {}) {
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

    return this.actionArrayMoveAtIndex(records, options).map((record, i) => record.set('order', i));
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
      [this.idField]: record.get(this.idField)
    });
  }

  static actionSave(record) {
    return this.duck.save(record, {
      invalidateList: true
    });
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

_defineProperty(BaseEntity, "name", 'BaseEntity');

class FilterEntity extends BaseEntity {
  static asParams(record, options) {
    return (record || immutable.Map()).filter((value, key) => key in this.fields).filterNot((value, key) => this.fields[key].local).map((value, key) => this.fields[key].asParams(value, options)).flatten();
  }

}

_defineProperty(FilterEntity, "name", 'FilterEntity');

_defineProperty(FilterEntity, "fields", {
  page: new IntegerField({
    default: 1
  }),
  page_size: new IntegerField({
    default: 20
  })
});

class TitleEntity extends BaseEntity {
  static toString(record) {
    return (record || immutable.Map()).get('title', '');
  }

}

_defineProperty(TitleEntity, "name", 'TitleEntity');

_defineProperty(TitleEntity, "fields", {
  uuid: new IdField({
    blank: true
  }),
  title: new CharField(),
  title_short: new CharField({
    blank: true
  }),
  is_archived: new BooleanField({
    default: false
  })
});

class EnumEntity extends BaseEntity {
  static toString(record) {
    return record.get('label');
  }

}

_defineProperty(EnumEntity, "idField", 'value');

_defineProperty(EnumEntity, "fields", {
  value: new CharField(),
  label: new CharField()
});

class EnumField extends EntityField {
  constructor(options) {
    super(Object.assign({
      entity: EnumEntity
    }, options));
  }

  dataToValue(data = null) {
    return data && this.getOptions().find(option => this.entity.getId(option) === data);
  }

  default() {
    return this.many ? immutable.List() : null;
  }

  isEnumActive(value, {
    name
  }) {
    return this.many ? value.some(v => v.get('value') === name) : !!value && value.get('value') === name;
  }

  valueToData(value = null) {
    return value && this.entity.getId(value);
  }

  valueToParam(value = null) {
    return value === null ? undefined : this.entity.getId(value);
  }

}

const Fields = Object.assign({
  EnumField
}, AllFields);
const Validators = AllValidators;

exports.Fields = Fields;
exports.Validators = Validators;
exports.Entity = Entity;
exports.BaseEntity = BaseEntity;
exports.FilterEntity = FilterEntity;
exports.TitleEntity = TitleEntity;
exports.EnumEntity = EnumEntity;
