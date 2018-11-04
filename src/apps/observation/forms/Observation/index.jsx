import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { ViewRedirectOnCreate } from '@entity/view';
import { UIErrorWell } from '@gnowth/ui';

import FormAction from 'apps/activity/forms/Action';
import FormControls from 'apps/activity/forms/Controls';

import locale from './locale';
import styles from './styles';

const FormObservation = props => (
  <Form {...props}>
    <Input component={UIErrorWell} />

    <Input
      component={ViewRedirectOnCreate}
      componentProps={{ to: props.field.entity.toLink(props.value) }}
    />

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

    <Input
      name="follow_up_actions"
      component={FormAction}
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: locale.follow_up_actions,
      }}
      many
    />

    <Control
      action={({ value, field, ...options }) => field.entity.actionActionsAdd(value, options)}
      componentProps={{ locale: locale.follow_up_actions_add }}
    />

    <Input
      component={FormControls}
      componentProps={{ css: styles.controls }}
    />
  </Form>
);

export default FormObservation;
