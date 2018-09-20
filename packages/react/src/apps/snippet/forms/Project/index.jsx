import React from 'react';
import { Control, Form, Input } from '@gnowth/entity-form';

const FormProject = props => (
  <Form {...props}>
    <Input
      name="name"
      wrapperComponentProps={{ label: 'Name' }}
    />

    <Input
      name="id_from_ad"
      wrapperComponentProps={{ label: 'ID from AD' }}
    />

    <Input
      name="hse_reps"
      wrapperComponentProps={{ label: 'HSE Reps' }}
      apiOptions
    />

    <Control
      action={({ value, field }) => field.entity.actionReset(value)}
      component="button"
      componentProps={{ children: 'RESET' }}
    />

    <Control
      action={({ value, field }) => field.entity.actionSave(value)}
      component="button"
      componentProps={{ children: 'SAVE' }}
    />
  </Form>
);

export default FormProject;
