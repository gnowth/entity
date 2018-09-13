import React from 'react';

import { Form, Input } from 'lib/entity-form';

import FMBasic from 'app/snippet/forms/FMBasic';

const FMNested = props => (
  <Form {...props}>
    <Input
      name="form_basic"
      label="Nested form"
      component={FMBasic}
    />
  </Form>
);

export default FMNested;
