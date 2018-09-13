import Extendable from 'lib/class-extend';

import { BaseEntity } from './entities';

export class Field extends Extendable {
  valueToParams(value) { // eslint-disable-line class-methods-use-this
    return value?.toString();
  }
}

export const AnyField = new Field({
  defaultValue: null,
});

export const TextField = AnyField.extends({
  defaultValue: '',
});

export const CharField = TextField.extends({});

export const UuidField = CharField.extends({});

export const DateField = AnyField.extends({});

export const NumberField = AnyField.extends({});

export const IntegerField = NumberField.extends({});

export const EntityField = AnyField.extends({
  entity: BaseEntity,

  asParams(value) {
    return value?.get(this.entity.idField);
  },

  defaultValue() {
    return this.blank
      ? null
      : this.entity.dataToRecord({});
  },

  extends(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('\'entity\' option is required when extending EntityField');
    }

    return AnyField.extends.call(this, options);
  },
});

// TODO check if normal field with option many/multi can be used
export const EntityListField = AnyField.extends({});


// import { List } from 'immutable';

// export const EntityListField = AnyField.extends({
//   entity: BaseEntity,
//   defaultValue: List(),

//   asParams(value) {
//     return value
//       ? value
//         .map(v => v.get(this.entity.idField))
//         .join(',')
//       : '';
//   },

//   extends(options) {
//     if (process.env.NODE_ENV !== 'production') {
//       if (options && !options.entity) throw new Error('\'entity\' option is required when extending EntityListField');
//     }

//     return AnyField.extends.call(this, options);
//   },
// });

// export const EnumField = AnyField.extends({
//   defaultValue: List(),

//   asParams(value) {
//     return value && value.size !== this.options.size
//       ? value.join(',')
//       : '';
//   },

//   asOptions() {
//     return this.options.map(option => ({
//       value: option,
//       label: this.messages[option],
//     }));
//   },

//   optionToString(option) {
//     return this.messages[option] || '';
//   },

//   extends(options) {
//     if (process.env.NODE_ENV !== 'production') {
//       if (options && !options.options) throw new Error('\'options\' option is required when extending EnumField');
//       if (options && !options.messages) throw new Error('\'messages\' option is required when extending EnumField');
//     }

//     return AnyField.extends.call(this, options);
//   },
// });