import React from 'react';
import { Control, Form, Input } from '@gnowth/entity-form';

import * as styles from './styles';
import locale from './locale';

const FormMain = props => (
  <Form {...props}>
    <Input
      name="title"
      wrapperComponentProps={{
        css: styles.inputs,
        labelLocale: locale.title,
      }}
    />

    <Input
      componentProps={{ css: styles.inputs }}
      name="titles"
      many
    />

    <Input name="title">
      { context => (
        <styles.InputText
          name={context.name}
          onChange={context.onChange}
          value={context.value}
        />
      )}
    </Input>

    <Input
      componentProps={{ css: styles.inputs }}
      name="user"
      apiOptions
    />

    <Control
      action={() => 'hhgg'}
      component="button"
      componentProps={{ children: 'test' }}
      name="title"
    />

    <Control
      action={({ value }) => value.push('New value')}
      component="button"
      componentProps={{ children: 'Testt' }}
      name="titles"
    />
  </Form>
);

export default FormMain;
