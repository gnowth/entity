import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { Form, ControlForm, Input, InputArray } from 'lib/entity-form';

import FormBasic from '../FormBasic';

const FormA = props => (
  <Form {...props}>
    <Input
      name="text1"
      widget="input"
    />

    <Input
      name="text2"
      widget="input"
    />

    <Input
      name="entity"
      widget={FormBasic}
      labelHidden
    />

    <InputArray
      name="entities"
      widget={FormBasic}
      labelHidden
    />

    <ControlForm
      widget="button"
      widgetProps={{ children: 'Test' }}
      action={entity => entity.actionReset}
    />
  </Form>
);

FormA.propTypes = {
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormA;
