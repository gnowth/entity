import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { compose } from 'redux';

import { Broadcasts } from 'lib/react-broadcasts';
import { PropTypesEntity } from 'lib/react-entities';
import withHandleChangeNested from 'lib/react-hoc/withHandleChangeNested';
import withShouldComponentUpdate from 'lib/react-hoc/withShouldComponentUpdate';

import withController from './withController';

const Form = ({ formName, name, value, field, onChange, onSubmit, children, component: Component, ...props }) => (
  <Broadcasts
    formFormName={formName}
    formField={field}
    formRecord={value}
    formOnChange={onChange}
    formOnSubmit={onSubmit}
    formFormProps={props}
  >
    <Component {...props}>{children}</Component>
  </Broadcasts>
);

Form.propTypes = {
  component: PropTypes.func.isRequired,
  formName: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
  field: PropTypesEntity.field,
  entity: PropTypesEntity.entity,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  asFieldSet: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Form.defaultProps = {
  formName: '',
  field: null,
  entity: null,
  asFieldSet: false,
  onSubmit: () => undefined,
};

export default compose(
  withShouldComponentUpdate(({ props, ...options }) => (
    !props.field
    || props.field.entity
      .getShouldComponentUpdate({ formName: props.formName, props, ...options })
  )),
  withController(),
  withHandleChangeNested({ renameHandleNestedChange: 'onChange' }),
)(Form);
