import React from 'react';
import { Form, Input } from '@entity/form';

import FormToolbarControls from 'apps/activity/forms/ToolbarControls';

const FormObservation = props => (
  <Form {...props}>
    <Input name="title" />

    <Input component={FormToolbarControls} />
  </Form>
);

export default FormObservation;
