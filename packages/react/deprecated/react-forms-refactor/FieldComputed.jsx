import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { withSubscribers } from 'lib/react-broadcasts';
import { PropTypesEntity } from 'lib/react-entities';

class FieldComputed extends React.Component {
  static getProps({ name, field, record, onChange, selector, validators, component, broadcastRecord, broadcastOnChange, broadcastFormName, broadcastFormProps, broadcastFormField, ...props }) {
    return {
      component,
      validators,
      selector,
      name,
      record: record || broadcastRecord,
      field: field || broadcastFormField?.entity.fields[name],
      onChange: onChange || broadcastOnChange,
      fieldProps: props,
      formName: props.formName || broadcastFormName,
      formProps: props.broadcastFormProps,
    };
  }

  static getWidgetProps({ name, ...props }) {
    return Object.assign(
      {},
      props.field.entity.getWidgetProps({ fieldName: name, ...props }),
      props.fieldProps,
    );
  }

  static getWidget({ name, field, component, ...props }) {
    return component || field?.entity.getWidget({ fieldName: name, ...props });
  }

  componentWillReceiveProps() {

  }

  selector = this.genDf();

  render() {
    const props = FieldComputed.getProps();
    const value = this.selector(props.record);
    const Widget = FieldComputed.getWidget({ ...props, value });
    const errors = 'df';

    if (process.env.NODE_ENV !== 'production') {
      if (!Widget) {
        throw new Error(`react-forms(FieldComputed): ${props.name} - Unable to generate Widget!`);
      }
    }

    return (
      <Widget
        name={props.name}
        value={value}
        record={props.record}
        errors={errors}
        field={props.field}
        formProps={props.formProps}
        {...FieldComputed.getWidgetProps()}
      />
    );
  }
}

FieldComputed.propTypes = {
  broadcastRecord: PropTypesImmutable.map.isRequired,
  broadcastOnChange: PropTypes.func.isRequired,
  broadcastFormName: PropTypes.string,
  broadcastFormField: PropTypesEntity.field,
  broadcastFormProps: PropTypesImmutable.map.isRequired,

  formName: PropTypes.string,
  name: PropTypes.string.isRequired,
  field: PropTypesEntity.field,
  record: PropTypesImmutable.map,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
};

FieldComputed.defaultProps = {
  broadcastFormName: '',
  broadcastFormField: null,

  formName: '',
  field: null,
  record: null,
  component: null,
};

export default withSubscribers([
  'broadcastRecord',
  'broadcastOnChange',
  'broadcastFormName',
  'broadcastFormField',
  'broadcastFormProps',
])(FieldComputed);
