import _isFunction from 'lodash/isFunction';
import { fromJS, List, Map } from 'immutable';

import EntityField from '../field/field-entity';
import IdField from '../field/field-id';

export default class Entity {
  static cleaners = []

  static idField = 'uuid'

  static fields = {
    uuid: new IdField({ blank: true }),
  }

  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be set.`);
      if (!List.isList(records)) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "records" must be an immutable list`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayDeleteAtIndex): "index" option must be set`);
    }

    return records.delete(index);
  }

  static actionArrayMoveAtIndex(records, { index = null, indexTo = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "records" must be set.`);
      if (index === null) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "index" option must be set.`);
      if (indexTo === null) throw new Error(`entity[${this.name}] (actionArrayMoveAtIndex): "indexTo" option must be set.`);
    }

    return records.delete(index).insert(indexTo, records.get(index));
  }

  // TODO check if reset should be reset to initialValue
  static actionReset(record) {
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static clean(record, options) {
    const newOptions = Object.assign({ entity: this }, options);

    return this.cleaners.reduce(
      (prev, cleaner) => cleaner(prev, newOptions),
      record,
    );
  }

  static dataToRecord(data = null) {
    const fieldDataToValue = (value, key) => (
      (List.isList(data) || Array.isArray(data))
        ? List(data).map(val => this.fields[key].dataToValue(val, { data }))
        : this.fields[key].dataToValue(value, { data })
    );

    const getDefaultFromField = field => (
      _isFunction(field.default)
        ? field.default({ data })
        : field.default
    );

    const values = Map(data)
      .filter((_, key) => key in this.fields)
      .filterNot(value => value === undefined)
      .map(fieldDataToValue);

    return data && Map(this.fields)
      .filter((_, key) => data[key] === undefined)
      .map(getDefaultFromField)
      .merge(values);
  }

  static getEntityField(options) {
    return new EntityField(Object.assign(
      { entity: this },
      options,
    ));
  }

  static getId(record) {
    return record?.get(this.idField) || '';
  }

  static isEntity(maybeEntity) {
    return !!maybeEntity && maybeEntity.prototype instanceof Entity;
  }

  static isEntityDescendant(maybeDescendant) {
    return !!maybeDescendant && maybeDescendant.prototype instanceof this;
  }

  static isValid(record, options) {
    return this.validate(record, options).size === 0;
  }

  // TODO check if need to deprecate
  static optionToString(option) {
    return this.toString(fromJS(option));
  }

  static toData(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error(`entity[${this.name}] (toData): record must be either a Map or null or undefined`);
    }

    const fieldValueToData = (value, key) => (
      List.isList(value)
        ? value.map(val => this.fields[key].toData(val, { record })).toArray()
        : this.fields[key].toData(value, { record })
    );

    return record && record
      .filter((_, key) => key in this.fields)
      .filterNot((_, key) => this.fields[key].local)
      .map(fieldValueToData)
      .toObject();
  }

  static toString(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (record && !Map.isMap(record)) throw new Error(`entity[${this.name}] (toString): record must be either a Map or null or undefined`);
    }

    return record?.get(this.idField) || '';
  }

  static validate(record, options = {}) {
    return record && Map({
      entityFields: Map(this.fields)
        .filter((field, key) => !options.fields || options.fields[key])
        .map((field, key) => field.validate(
          record.get(key),
          { ...options, record, validators: options.fields && options.fields[key] },
        )).filterNot(errors => errors.size === 0),
      entityNonFields: List(options.nonFields || []).map(validator => validator(record, options)),
    }).filterNot(errors => errors.size === 0);
  }
  // TODO
  // static validate(record, options) {
  //   const fields = Map(this.fields)
  //     .map((field, name) => {
  //       field.validate(record.get(name), {})
  //     })
  //     .filterNot(errors => errors.size === 0)

  //   const validatorMap = options.fields;
  // }
}

// const entityValidate = (record, options = {}) => {
//   return record && Map(options.fields ? _pick(options.fields)(this.fields) : this.fields)
//     .map((field, name) => field.validate(
//       record.get(name),
//       Object.assign({}, _omit(['fields'])(options), { record, field, name, formEntity: this }),
//     ))
//     .filterNot(errors => errors.size === 0);
// }

// const newEntityValidate = () => {

// }


// const options = {
//   validators: []
// }

// const errors = {
//   er: {
//     actions: [
//       {},
//       {
//         date: ['eror', 'error'],
//         date2: ['dfdf'],
//       },
//     ],
//     df: ['effor'],
//   },
//   errors: {

//   },
//   nonFieldErrors: [],
// };

// // entity.validate(value, {
// //   nested: true,
// //   fields: {
// //     df: [],
// //     df1: [
// //       validators.isRequired,
// //       validators.entity({
// //         fields: {

// //         }
// //       }),
// //     ],
// //   }
// // })


// const fieldValidate = (value, options) => {
//   if (process.env.NODE_ENV !== 'production') {
//     if (this.many && !List.isList(value)) throw new Error('Entity(validate): "value" must be an "Immutable List" with field option "many"');
//   }

//   const validateValue = (val, validators) => List(validators)
//     .flatMap((validator) => {
//       const errors = validator(val, Object.assign({}, options, { field: this }));
//       const errorList = List.isList(errors) ? errors : List([errors]);

//       return errorList
//         .filter(error => error)
//         .map((error) => {
//           if (_isString(error)) return Map({ message: error });
//           if (error === true) return Map({ message: 'Unidentified Error' });

//           if (process.env.NODE_ENV !== 'production') {
//             if (!Map.isMap(error)) throw new Error(`entity: Received error which is neither a "boolean" nor a "string" nor a "Map". Check the validators used in field with entity ${this.name}`);
//           }

//           return error;
//         });
//     });

//   const errors = validateValue(value, this.many ? this.listValidators : this.validators);

//   if (this.many) {
//     const nestedErrors = value && value.map(v => validateValue(v, this.validators));

//     return nestedErrors && nestedErrors.every(err => err.size === 0)
//       ? errors
//       : errors.push(Map({
//         listError: true,
//         message: this.errorListMessage,
//         errors: nestedErrors,
//       }));
//   }

//   return errors;
// }

// const newFieldValidate = () => {

// };

// const errors = {
//   entityFields: {
//     title: {
//       detail: ['', ''],
//     }
//     title: ['', ''],
//     entity: {
//       field: {},
//       nonField: ['', ''],
//     },
//     titles: {
//       detail: ['', ''],
//       list: [[], [], []],
//     },
//     entities: {
//       detail: ['', ''],
//       list: [{}, {}, {}],
//     },
//   },
//   apiFields: {
//     title: ['', ''],
//     entity: {
//       fieldApi: {},
//       nonFieldApi: ['', ''],
//     },
//     titles: {
//       detail: ['', ''],
//       list: [[''], [], []],
//     },
//     entities: {
//       detail: [''],
//       list: [{}, {}, {}],
//     },
//   },
//   entityNonFields: [],
//   apiNonFields: [],
// };

// entity.validate(record, {
//   fields: {

//   },
//   nonFields: {

//   },
// });

// const validatorOutput = [
//   'Error message',
//   true,
//   { intlMessage },
// ]

// Map()

