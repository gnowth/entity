import React from 'react';

import { Form, Input } from 'lib/entity-form';

const FMBasic = props => (
  <Form {...props}>
    <Input
      name="input_char"
      label="Characters"
    />

    <Input
      name="input_text"
      label="Texts"
    />
  </Form>
);

export default FMBasic;
