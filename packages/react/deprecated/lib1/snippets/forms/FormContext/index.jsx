import React from 'react';

import { Form, ContextForm, ContextInput } from 'lib/entity-form';

// FYI not working, but ideas that can be implement
const FormControl = props => (
  <Form {...props}>
    <ContextInput name="text1">
      { ({ value /* , onChange, errors */ }) => (
        <div>{ value }</div>
      )}
    </ContextInput>

    <ContextForm>
      { ({ value }) => (
        <div>{ value }</div>
      )}
    </ContextForm>
  </Form>
);

export default FormControl;
