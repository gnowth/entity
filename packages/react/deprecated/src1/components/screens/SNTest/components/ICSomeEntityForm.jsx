import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { Form, Field } from 'lib/react-forms';
import { PropTypesEntity } from 'lib/react-entities';

const ICSomeEntityForm = ({ formName, name, value, onChange, field }) => (
  <Form formName={formName} name={name} value={value} onChange={onChange} field={field}>
    SomeEntityForm

    <br />
    CharField
    <Field name="task" />

    <br />
    TextField
    <Field name="feedback" />

    <br />
    Override TextField widget to password
    <Field name="description" />

    <br />
    Override TextField widget with form widget
    <Field name="observation" />
  </Form>
);

ICSomeEntityForm.propTypes = {
  formName: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypesEntity.field.isRequired,
};

ICSomeEntityForm.defaultProps = {
  formName: null,
};

export default ICSomeEntityForm;
