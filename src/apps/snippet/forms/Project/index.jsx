import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIError } from '@gnowth/ui';

import styles, { Controls } from './styles';

const Test = () => {
  dsf.dfdf()
  // throw new Error('New error test');
}

const FormProject = props => (
  <Form {...props}>
    <Input
      name="name"
      wrapperComponentProps={{
        css: styles.inputs,
        label: 'Name',
      }}
    />

    <Input
      name="id_from_ad"
      wrapperComponentProps={{
        css: styles.inputs,
        label: 'ID from AD',
      }}
    />
    <UIError>
      <Test />
    </UIError>

    <Input
      name="hse_reps"
      wrapperComponentProps={{
        css: styles.inputs,
        label: 'HSE Reps',
      }}
      apiOptions
    />

    <Controls>
      <Control
        action={({ value, field }) => field.entity.actionReset(value)}
        componentProps={{
          css: styles.buttons,
          label: 'RESET',
        }}
      />

      <Control
        action={({ value, field }) => field.entity.actionSave(value)}
        componentProps={{
          css: styles.buttons,
          label: 'SAVE',
        }}
      />
    </Controls>
  </Form>
);

export default FormProject;
