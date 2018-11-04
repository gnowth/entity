import React from 'react';
import { Control, Form, Input } from '@entity/form';

import styles, { InputText } from './styles';
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

    <Input name="title">
      { context => <InputText {...context} /> }
    </Input>

    <Input
      componentProps={{ css: styles.inputs }}
      name="titles"
      wrapperComponentProps={{ label: 'Titles' }}
      many
    />

    <Input
      componentProps={{ css: styles.inputs }}
      name="has_title"
      wrapperComponentProps={{ label: 'Has Title' }}
    />

    <Input
      componentProps={{ css: styles.inputs }}
      name="user"
      wrapperComponentProps={{ label: 'User' }}
      apiOptions
    />

    <Input
      componentProps={{ css: styles.inputs }}
      name="users"
      wrapperComponentProps={{ label: 'Users' }}
      apiOptions
    />

    <Input
      componentProps={{ css: styles.inputs }}
      name="description"
      wrapperComponentProps={{ label: 'Description' }}
    />

    <Control
      action={() => 'hhgg'}
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
