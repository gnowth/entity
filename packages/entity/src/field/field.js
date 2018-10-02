import { List } from 'immutable';

export default class Field {
  dataToValue(data) {
    return data;
  }

  default() {
    return this.many ? List() : null;
  }

  isBlank(value = null) {
    return this.many
      ? value.size === 0
      : value === null;
  }

  toData(value) {
    return value;
  }

  toParams(value) {
    return this.toString(value);
  }

  toString(value = null) {
    return value === null
      ? ''
      : value.toString();
  }
}


// export default class Field {
//   constructor(options = {}) {
//     Object.assign(
//       this,
//       {
//         blank: false,
//         many: false,
//         flags: {},
//         cleaners: [],
//         validators: [],
//         listValidators: [],
//       },
//       options,
//       {
//         defaultValidators: [].concat(
//           (!options.many && (!options.blank || options.flags)) ? [mayNotBeBlank] : [],
//           options.defaultValidators || [],
//         ),
//         defaultListValidators: [].concat(
//           (options.many && (!options.blank || options.flags)) ? [mayNotBeBlank] : [],
//           options.defaultListValidators || [],
//         ),
//       },
//     );

//     this.validators = this.preventDefaultValidators
//       ? this.validators
//       : this.defaultValidators.concat(this.validators);

//     this.listValidators = this.preventDefaultValidators
//       ? this.listValidators
//       : this.defaultListValidators.concat(this.listValidators);
//   }

//   asOptions() {
//     return this.options.map(option => ({
//       value: option,
//       label: this.messages[option],
//     }));
//   }

//   asParams(value = null, options) {
//     if (value === null) return undefined;

//     const values = this.many ? value : List([value]);

//     return values
//       .filterNot((v = null) => v === null)
//       .map(v => this.valueToParam(v, options))
//       .join(',');
//   }

//   clean(value, options) {
//     const newOptions = Object.assign({}, options, { field: this });

//     return this.cleaners.reduce(
//       (cumm, cleaner) => cleaner(cumm, newOptions),
//       value,
//     );
//   }

//   dataToRecord(data = null) {
//     if (List.isList(data)) {
//       return data.map(this.dataToValue.bind(this));
//     }

//     return Array.isArray(data)
//       ? List(data.map(this.dataToValue.bind(this)))
//       : this.dataToValue(data);
//   }

//   dataToValue(data) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
//     return data;
//   }

//   default() {
//     return this.many ? List() : null;
//   }

//   getField({ name } = {}) {
//     if (process.env.NODE_ENV !== 'production') {
//       if (name) throw new Error('entity (field.getField): field type does not support sub field');
//     }

//     return name ? null : this;
//   }

//   getOptions() {
//     return this.options || List();
//   }

//   getValue(value, { name } = {}) { // eslint-disable-line class-methods-use-this
//     if (process.env.NODE_ENV !== 'production') {
//       if (name) throw new Error('entity (field.getValue): field type does not support sub field');
//     }

//     return name ? null : value;
//   }

//   isBlank(value = null) {
//     return value === null || (
//       this.many
//         ? value.size === 0
//         : value === ''
//     );
//   }

//   isValid(value, options) {
//     return this.validate(value, options).size === 0;
//   }

//   optionToString(option) {
//     return this.messages[option] || '';
//   }

//   recordToData(record) {
//     if (this.local) return undefined;

//     return List.isList(record)
//       ? record.map(this.valueToData.bind(this)).toArray()
//       : this.valueToData(record);
//   }

//   toString(value = null) { // eslint-disable-line class-methods-use-this
//     return value === null
//       ? ''
//       : value.toString();
//   }

//   validate(value, options) {
//     if (process.env.NODE_ENV !== 'production') {
//       if (this.many && !List.isList(value)) throw new Error('Entity(validate): "value" must be an "Immutable List" with field option "many"');
//     }

//     const validateValue = (val, validators) => List(validators)
//       .flatMap((validator) => {
//         const errors = validator(val, Object.assign({}, options, { field: this }));
//         const errorList = List.isList(errors) ? errors : List([errors]);

//         return errorList
//           .filter(error => error)
//           .map((error) => {
//             if (_isString(error)) return Map({ message: error });
//             if (error === true) return Map({ message: 'Unidentified Error' });

//             if (process.env.NODE_ENV !== 'production') {
//               if (!Map.isMap(error)) throw new Error(`entity: Received error which is neither a "boolean" nor a "string" nor a "Map". Check the validators used in field with entity ${this.name}`);
//             }

//             return error;
//           });
//       });

//     const errors = validateValue(value, this.many ? this.listValidators : this.validators);

//     if (this.many) {
//       const nestedErrors = value && value.map(v => validateValue(v, this.validators));

//       return nestedErrors && nestedErrors.every(err => err.size === 0)
//         ? errors
//         : errors.push(Map({
//           listError: true,
//           message: this.errorListMessage,
//           errors: nestedErrors,
//         }));
//     }

//     return errors;
//   }

//   valueToParam(value = null) {
//     if (value === null) return undefined;

//     return this.toString(value);
//   }

//   valueToData(value) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
//     return value;
//   }
// }
