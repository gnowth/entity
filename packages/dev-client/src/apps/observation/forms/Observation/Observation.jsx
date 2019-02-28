import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input, PopupShadow } from '@entity/form';
import { ViewRedirectOnCreate } from '@entity/view';
import { UIErrorWell } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';

import FormAction from 'apps/activity/forms/Action';
import FormControls from 'apps/activity/forms/Controls';

import FormTitle from './FormTitle';
import locales from './Observation.locales';
import styles from './Observation.styles';

function FormObservation(props) {
  const enhancedProps = useEnhance(props, { locales, styles });

  return (
    <Form {...enhancedProps}>
      <Input component={UIErrorWell} />

      <Input
        component={ViewRedirectOnCreate}
        componentProps={{ to: enhancedProps.field.entity.toLink(enhancedProps.value) }}
      />

      <Input
        name="date_activity"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.date_activity,
        }}
      />

      <Input
        name="title"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.title,
        }}
      />

      <PopupShadow
        controlComponentProps={{ children: 'Test' }}
        component={FormTitle}
      />

      <Input
        name="title_short"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.title_short,
        }}
      />

      <Input
        name="description"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.description,
        }}
      />

      <Input
        name="date_due"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.date_due,
        }}
      />

      <Input
        name="follow_up_actions"
        component={FormAction}
        componentProps={({ value }) => ({ records: value })}
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          label: enhancedProps.locales.follow_up_actions,
        }}
        many
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionActionsAdd(value, options)}
        componentProps={{ content: enhancedProps.locales.follow_up_actions_add }}
      />

      <Input
        component={FormControls}
        componentProps={{ css: enhancedProps.styles.controls }}
      />
    </Form>
  );
}

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
  locales: undefined,
  styles: undefined,
};

export default React.memo(FormObservation);
