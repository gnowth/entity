import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { Form, Field } from 'lib/react-forms';
import withHandleChangeDebounced from 'lib/react-hoc/withHandleChangeDebounced';

import ICDebouncedInput from './ICDebouncedInput';

const ICDebounceForm = ({ name, value, onChange }) => (
  <Form name={name} value={value} onChange={onChange}>
    DebounceForm

    <br />
    Normal Input
    <Field name="someField" component="input" />

    <br />
    Debounced Input
    <Field name="someOtherField" component={ICDebouncedInput} />
  </Form>
);

ICDebounceForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withHandleChangeDebounced()(ICDebounceForm);
