import _mapValues from 'lodash/fp/mapValues';
import _pick from 'lodash/fp/pick';
import React from 'react';
import { fromJS } from 'immutable';

import { flow, callIfFunction } from 'lib/context-binds';

export default class Entity {
  static idField = 'uuid';
  static paginated = false;
  static apiBase = '';
  static fields = {};
  static forms = {};

  static dataToRecord({ data = {} } = {}) {
    const dataWithDefault = Object.assign(
      this.fields::flow(
        _pick(Object.keys(data)),
        _mapValues(field => field.defaultValue::callIfFunction()),
      ),

      data::flow(
        _pick(Object.keys(this.fields)),
      ),
    );

    return fromJS(dataWithDefault);
  }

  static shouldComponentUpdate({ nextProps, props }) {
    return nextProps.value !== props.value;
  }

  static valueWillChange({ nextValue }) {
    // TODO getValueWillChange to update computed values ?
    return nextValue;
  }

  static getWidget({ formName, fieldName, ...options }) {
    const widget = this.forms[formName]?.fields[fieldName]?.widget
      || this.fields[fieldName]?.defaultWidget;

    if (widget instanceof Function && !widget.constructor) {
      // TODO check if options need value
      const output = widget(options);

      return React.isValidElement(output) ? widget : output;
    }

    return widget;
  }

  static getWidgetProps({ fieldName, formName, ...options }) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof fieldName !== 'string') {
        throw new Error(`react-entities(Entity.getWidgetProps): ${this.name} - fieldName option of type 'string' is required!`);
      }

      if (!Map.isMap(options.record)) {
        throw new Error(`react-entities(Entity.getWidgetProps): ${this.name} - record option of type 'Immutable.Map' is required!`);
      }
    }

    const widgetProps = this.forms[formName]?.fields?.[fieldName]?.widget
      ? this.forms[formName]?.fields?.[fieldName]?.widgetProps
      : this.fields[fieldName]?.defaultWidgetProps;

    return widgetProps::flow(
      mapValues(wProp => wProp::callIfFunction({
        ...options,
        value: options.record.get(fieldName),
      })),
    );
  }
}
