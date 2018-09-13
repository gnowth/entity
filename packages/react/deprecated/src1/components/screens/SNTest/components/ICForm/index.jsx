import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { Form, Field } from 'lib/react-forms';

import ICDebouncedInput from './ICDebouncedInput';

const ICForm = ({ name, value, onChange }) => (
  <Form name={name} value={value} onChange={onChange}>
    NormalForm

    <br />
    Normal Input
    <Field name="someField" component="input" />

    <br />
    DebouncedInput
    <Field name="someOtherField" component={ICDebouncedInput} />
  </Form>
);

ICForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ICForm;
