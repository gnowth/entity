import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Control, Form, Input, PopupShadow } from '@entity/form';
import { ViewRedirectOnCreate } from '@entity/view';
import { UIErrorWell } from '@gnowth/ui';

import FormAction from 'apps/activity/forms/Action';
import FormControls from 'apps/activity/forms/Controls';

import FormTitle from './FormTitle';
import locales from './Observation.locales';
import styles from './Observation.styles';

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
        label: locales.date_activity,
      }}
    />

    <Input
      name="title"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.title,
      }}
    />

    <PopupShadow
      controlComponentProps={{ children: 'Test' }}
      component={FormTitle}
    />

    <Input
      name="title_short"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.title_short,
      }}
    />

    <Input
      name="description"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.description,
      }}
    />

    <Input
      name="date_due"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.date_due,
      }}
    />

    <Input
      name="follow_up_actions"
      component={FormAction}
      componentProps={({ value }) => ({ records: value })}
      wrapperComponentProps={{
        css: styles.input,
        label: locales.follow_up_actions,
      }}
      many
    />

    <Control
      action={({ value, field, ...options }) => field.entity.actionActionsAdd(value, options)}
      componentProps={{ content: locales.follow_up_actions_add }}
    />

    <Input
      component={FormControls}
      componentProps={{ css: styles.controls }}
    />
  </Form>
);

FormObservation.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  value: PropTypesImmutable.map.isRequired,
};

export default React.memo(FormObservation);
