import React from 'react';
import { fromJS, Map } from 'immutable';

import { callIfFunction, filterEntries, filterNotEntries, forEach, getIn, mapValues } from 'lib/context-methods';

import Fields from './fields';

export default class Entity {
  static defaultOptions = {
    idField: 'uuid',
    apiBase: '',
    paginated: false,
    valueWillChange: ({ nextValue }) => nextValue, // TODO getValueWillChange to update computed values
    shouldComponentUpdate: ({ nextProps, props }) => nextProps.value !== props.value,
    fields: {},
    forms: {},
  };

  constructor(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) {
        throw new Error('react-entities(Entity): \'options\' is required!');
      }

      if (typeof options.name !== 'string') {
        throw new Error('react-entities(Entity): \'name\' option of type \'string\' is required!');
      }

      if (Object.keys(options).some(key => key in this)) {
        throw new Error(`react-entities(Entity): ${options.name} - options contain reserved key`);
      }

      if (!options.fields) {
        throw new Error(`react-entities(Entity): ${options.name} - 'fields' option of type 'object' is required!`);
      }

      options.fields::forEach((field, key) => {
        if (!(field instanceof Fields.Field)) {
          throw new Error(`react-entities(Entity): ${options.name} - field '${key}' must be of type 'Field'`);
        }
      });
    }

    Object.assign(
      this,
      Entity.defaultOptions,
      options::filterNotEntries((_, key) => key in this),
    );
  }

  extend(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) {
        throw new Error(`react-entities(Entity.extend): ${this.name} - 'options' is required!`);
      }
    }

    return new Entity({
      ...this.options,
      ...options,
      forms: Object.assign({}, this.options.forms, options.forms),
      fields: Object.assign({}, this.options.fields, options.fields),
    });
  }

  dataToRecord(data = {}) {
    return fromJS(Object.assign(
      this.fields
        ::filterNotEntries((_, key) => key in data)
        ::mapValues(field => field.defaultValue::callIfFunction()), // TODO: maybe have field.getDefaultValue
      data::filterEntries((_, key) => key in this.fields),
    ));
  }

  getShouldComponentUpdate({ fieldName, formName, ...options }) {
    if (process.env.NODE_ENV !== 'production') {
      // if (typeof fieldName !== 'string') {
      //   throw new Error(`react-entities(Entity.getShouldComponentUpdate): ${this.name} - fieldName option of type 'string' is required!`);
      // }

      if (!options.props) {
        throw new Error(`react-entities(Entity.getShouldComponentUpdate): ${this.name} - props option is required!`);
      }

      if (!options.nextProps) {
        throw new Error(`react-entities(Entity.getShouldComponentUpdate): ${this.name} - nextProps option is required!`);
      }

      if (options.state === undefined) {
        throw new Error(`react-entities(Entity.getShouldComponentUpdate): ${this.name} - state option is required!`);
      }

      if (options.nextState === undefined) {
        throw new Error(`react-entities(Entity.getShouldComponentUpdate): ${this.name} - nextState option is required!`);
      }
    }

    // OPTIONAL-BINDING ALTERNATIVE
    // const shouldComponentUpdate = fieldName
    //   ? this.forms[formName]?.fields?.[fieldName]?.shouldComponentUpdate
    //     || this.fields[fieldName]?.defaultShouldComponentUpdate
    //   : this.forms[formName]?.shouldComponentUpdate
    //     || this.shouldComponentUpdate;

    const shouldComponentUpdate = fieldName
      ? this::getIn(['forms', formName, 'fields', fieldName, 'shouldComponentUpdate'])
        || this::getIn(['fields', fieldName, 'defaultShouldComponentUpdate'])
      : this::getIn(['forms', formName, 'shouldComponentUpdate'])
        || this.shouldComponentUpdate;

    return shouldComponentUpdate(options);
  }

  getWidget({ formName, fieldName, ...options }) {
    const widget = this::getIn(['forms', formName, 'fields', fieldName, 'widget'])
      || this::getIn(['fields', fieldName, 'defaultWidget']);

    if (widget instanceof Function && !widget.constructor) {
      // TODO check if options need value
      const output = widget(options);

      return React.isValidElement(output) ? widget : output;
    }

    return widget;
  }

  getWidgetProps({ fieldName, formName, ...options }) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof fieldName !== 'string') {
        throw new Error(`react-entities(Entity.getWidgetProps): ${this.name} - fieldName option of type 'string' is required!`);
      }

      if (!Map.isMap(options.record)) {
        throw new Error(`react-entities(Entity.getWidgetProps): ${this.name} - record option of type 'Immutable.Map' is required!`);
      }
    }

    // OPTIONAL-BINDING ALTERNATIVE
    // const widgetProps = this.forms[formName]?.fields?.[fieldName]?.widget
    //   ? this.forms[formName]?.fields?.[fieldName]?.widgetProps
    //   : this.fields[fieldName]?.defaultWidgetProps;

    const widgetProps = this::getIn(['forms', formName, 'fields', fieldName, 'widget'])
      ? this::getIn(['forms', formName, 'fields', fieldName, 'widgetProps'])
      : this::getIn(['fields', fieldName, 'defaultWidgetProps']);

    return widgetProps::mapValues(
      wProp => wProp::callIfFunction({
        ...options,
        value: options.record.get(fieldName),
      }),
    );
  }

  validate({ value, ...args }) {
    const errorMap = this.fields
      ::mapValues((field, key) => field.validate({ value: value.get(key), ...args }))
      ::filterEntries(errors => errors.length > 0);

    return Object.keys(errorMap).length > 0
      ? [errorMap]
      : [];
  }
}

// normalize(data) {
//   const normalisedObject = this.fields::map((field, name) => {
//     if (field instanceof EntityListField) {
//       return data[name].map(value => field.entity.getUUID(value));
//     }

//     if (field instanceof EntityField) {
//       return field.entity.getUUID(data[name]);
//     }

//     return data[name];
//   });

//   const result = {
//     [this.name]: {
//       byID: {
//         [this.getUUID(data)]: normalisedObject,
//       },
//     },
//   };

//   const resultEntityList = this.fields
//     ::filter(field => field instanceof EntityListField)
//     ::map((field, name) => data[name].map(value => field.entity.normalise(value)));

//   const resultEntity = this.fields
//     ::filter(field => field instanceof EntityField)
//     ::map((field, name) => field.entity.normalise(data[name]));

//   return merge({}, ...flatten(resultEntityList), ...resultEntity, result);
// }

// denormalise(record, normalisedState) {
//   const reducePredicate = (prevRecord, field, name) => compose(
//     subRecord => prevRecord.set(name, subRecord),
//     subRecord => field.entity.denormalise(subRecord, normalisedState),
//     subRecord => normalisedState.getIn([field.name, 'byID', subRecord.get(name)]),
//   )(prevRecord);

//   const reduceListPredicate = (prevRecord, field, name) => compose(
//     subRecord => prevRecord.set(name, subRecord),
//     records => records.map(subRecord => field.entity.denormalise(subRecord, normalisedState)),
//     recordIDList => recordIDList.map(id => normalisedState.getIn([field.name, 'byID', id])),
//     subRecord => subRecord.get(name),
//   )(prevRecord);

//   const recordWithEntity = this.fields
//     ::filter(field => field instanceof EntityField)
//     ::reduce(reducePredicate, record);

//   return this.fields
//     ::filter(field => field instanceof EntityListField)
//     ::reduce(reduceListPredicate, recordWithEntity);
// }
