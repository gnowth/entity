import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { ViewRedirectOnCreate } from '@entity/view';
import { UIErrorWell } from '@gnowth/ui';

import FormAction from 'apps/activity/forms/Action';
import FormControls from 'apps/activity/forms/Controls';

import defaultLocales from './Observation.locales';
import styles from './Observation.styles';

const FormObservation = (props) => {
  const locales = Object.assign({}, defaultLocales, props.locales);

  return (
    <Form {...props}>
      <Input component={UIErrorWell} />

      <Input
        component={ViewRedirectOnCreate}
        componentProps={{ to: props.field.entity.toLink(props.value) }}
      />

      <Input
        name="date_activity"
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.date_activity,
        }}
      />

      <Input
        name="title"
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.title,
        }}
      />

      <Input
        name="title_short"
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.title_short,
        }}
      />

      <Input
        name="description"
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.description,
        }}
      />

      <Input
        name="date_due"
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.date_due,
        }}
      />

      <Input
        name="follow_up_actions"
        component={FormAction}
        componentProps={({ value }) => ({ records: value })}
        wrapperComponentProps={{
          css: props.styles.input,
          labelLocale: locales.follow_up_actions,
        }}
        many
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionActionsAdd(value, options)}
        componentProps={{ locale: locales.follow_up_actions_add }}
      />

      <Input
        component={FormControls}
        componentProps={{ css: props.styles.controls }}
      />
    </Form>
  );
};

FormObservation.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  locales: PropTypes.exact({
    date_activity: PropTypesPlus.locale,
    date_due: PropTypesPlus.locale,
    description: PropTypesPlus.locale,
    follow_up_actions: PropTypesPlus.locale,
    follow_up_actions_add: PropTypesPlus.locale,
    title: PropTypesPlus.locale,
    title_short: PropTypesPlus.locale,
  }),
  styles: PropTypes.exact({
    input: PropTypesPlus.css,
    controls: PropTypesPlus.css,
  }),
  value: PropTypesImmutable.map.isRequired,
};

FormObservation.defaultProps = {
  styles,
  locales: undefined,
};

export default React.memo(FormObservation);
