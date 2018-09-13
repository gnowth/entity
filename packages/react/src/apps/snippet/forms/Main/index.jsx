import React from 'react';

import { Form, Input } from 'lib/entity-form';

const FormMain = props => (
  <Form {...props}>
    <Input name="title" />

    <Input
      name="user"
      willChangeRecord={({ name, value, index, prevValue, record, nextRecord }) => record}
      many
    />
  </Form>
);

export default FormMain;
