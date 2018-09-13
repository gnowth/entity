import React from 'react';

import { Form, ControlForm, ControlDispatch, ControlInput, ControlAction } from 'lib/entity-form';

// FYI not working, but ideas that can be implement
const FormControl = props => (
  <Form {...props}>
    <ControlInput
      name="entities"
      widget="button"
      widgetProps={{ children: 'Add New' }}
    />

    <ControlForm
      widget="button"
      widgetProps={{ children: 'Reset' }}
      event="onClick"
      action={entity => entity.actionReset}
      actionOptions={{ additionalData: true }}
    />

    <ControlAction
      widget="button"
      widgetProps={{ children: 'Submit' }}
      action={duck => duck.submit}
      actionOptions={{ additionalData: true }}
    />

    <ControlDispatch
      widget="button"
      widgetProps={{ children: 'Submit' }}
      action={(payload, meta) => meta.entity.duck.save(payload, meta)}
      selectorInProgress={options => options.entity.duck.record}
      callback={options => options.entity.actionOnSubmit(options)}
    />
  </Form>
);

export default FormControl;
