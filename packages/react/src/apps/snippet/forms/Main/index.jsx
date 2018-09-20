import React from 'react';
import { Control, Form, Input } from '@gnowth/entity-form';

const FormMain = props => (
  <Form {...props}>
    <Input
      name="title"
    />

    <Input
      name="titles"
      many
    />

    <Input name="title">
      { context => (
        <input
          name={context.name}
          onChange={context.onChange}
          value={context.value}
        />
      )}
    </Input>

    <Input
      name="user"
      apiOptions
    />

    <Control
      action={() => 'hhgg'}
      component="button"
      componentProps={{ children: 'test' }}
      name="title"
    />
  </Form>
);

export default FormMain;
