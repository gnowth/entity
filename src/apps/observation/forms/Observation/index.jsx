import React from 'react';
import { Form, Input } from '@entity/form';

import FormToolbarControls from 'apps/activity/forms/ToolbarControls';

const FormObservation = props => (
  <Form {...props}>
    <Input name="date_activity" />

    <Input name="title" />

    <Input name="title_short" />

    <Input name="description" />

    <Input name="date_due" />

    <Input component={FormToolbarControls} />
  </Form>
);

export default FormObservation;
