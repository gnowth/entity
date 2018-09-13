import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { compose } from 'redux';

import { PropTypesEntity } from 'lib/react-entities';
import withShouldComponentUpdate from 'lib/react-hoc/withShouldComponentUpdate';

import withFieldProps from './withFieldProps';

const Field = ({ component: Component, formName, formField, name, value, record, field, onChange, formProps, ...props }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (formField && !(name in formField.entity.fields)) {
      throw new Error(`Field '${name}' is not a valid field in Entity '${formField.entity.name}'`);
    }
  }

  const widgetProps = Object.assign(
    {},
    formField && formField.entity.getWidgetProps({
      fieldName: name,
      formName,
      value,
      record,
      fieldProps: props,
      formProps,
    }),
    props,
    {
      name,
      value,
      onChange,
    },
    typeof Component !== 'string' && { record, field },
  );

  return (
    <Component {...widgetProps} />
  );
};

Field.propTypes = {
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  formName: PropTypes.string,
  formField: PropTypesEntity.field,
  name: PropTypes.string.isRequired,
  field: PropTypesEntity.field,
  record: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
  formProps: PropTypes.shape({}).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
};

Field.defaultProps = {
  value: null,
  formName: null,
  formField: null,
  field: null,
};

export default compose(
  withFieldProps(),
  withShouldComponentUpdate(({ props, ...options }) => (
    !props.formField
    || props.formField.entity
      .getShouldComponentUpdate({ fieldName: props.name, formName: props.formName, props, ...options })
  )),
)(Field);
