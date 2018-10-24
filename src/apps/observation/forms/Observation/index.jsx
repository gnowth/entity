import React from 'react';
import { Form, Input } from '@entity/form';

import FormToolbarControls from 'apps/activity/forms/ToolbarControls';

import locale from './locale';
import styles from './styles';

const FormObservation = props => (
  <Form {...props}>
    <Input
      name="date_activity"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.date_activity,
      }}
    />

    <Input
      name="title"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.title,
      }}
    />

    <Input
      name="title_short"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.title_short,
      }}
    />

    <Input
      name="description"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.description,
      }}
    />

    <Input
      name="date_due"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.date_due,
      }}
    />

    <Input component={FormToolbarControls} />
  </Form>
);

export default FormObservation;
