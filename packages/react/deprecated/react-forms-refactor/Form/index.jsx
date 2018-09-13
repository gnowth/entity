// @flow
import * as React from 'react';
import { compose } from 'redux';

import { Broadcasts } from 'lib/react-broadcasts';
import withHandleChangeNested from 'lib/react-hoc/withHandleChangeNested';
import withShouldComponentUpdate from 'lib/react-hoc/withShouldComponentUpdate';

import withController from './controller';

type Props = {
  formName?: string,
  name: string,
  value: any,
  field?: Object,
  onChange: Function,
  onSubmit?: Function,
  component: Function,
  asFieldSet?: Boolean,
  children: React.Node,
};

const Form = ({ formName, name, value, field, onChange, onSubmit, children, component: Component, ...props }: Props) => (
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

Form.defaultProps = {
  formName: '',
  field: null,
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
