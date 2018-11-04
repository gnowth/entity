import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIIcon, UITypeSet } from '@gnowth/ui';

import locale from './locale';
import styles, { Controls, Header } from './styles';

const FormAction = props => (
  <Form {...props}>
    <Header>
      <UITypeSet locale={props.locale.header_title} variant="header_title" />

      <Control
        action={({ value, field, ...options }) => field.entity.actionDelete(value, options)}
        component={UIIcon}
        componentProps={{ name: 'delete' }}
      />
    </Header>

    <Input
      name="person_responsible"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: props.locale.person_responsible,
      }}
    />

    <Input
      name="date_due"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: props.locale.date_due,
      }}
    />

    <Input
      name="completed_by"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: props.locale.completed_by,
      }}
    />

    <Input
      name="date_completed"
      wrapperComponentProps={{
        css: styles.input,
        labelLocale: props.locale.date_completed,
      }}
    />

    <Controls>
      <Control
        action={({ value, field, ...options }) => field.entity.actionUpdate(value, options)}
        componentProps={{
          css: styles.control,
          locale: props.locale.update,
        }}
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionComplete(value, options)}
        componentProps={{
          css: styles.control,
          locale: props.locale.complete,
        }}
      />
    </Controls>
  </Form>
);

FormAction.propTypes = {
  field: PropTypesEntity.entityFieldWithInterface({
    actionComplete: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    actionUpdate: PropTypes.func.isRequired,
  }).isRequired,

  locale: PropTypes.shape({
    complete: PropTypesPlus.locale.isRequired,
    completed_by: PropTypesPlus.locale.isRequired,
    date_completed: PropTypesPlus.locale.isRequired,
    date_due: PropTypesPlus.locale.isRequired,
    header_title: PropTypesPlus.locale.isRequired,
    person_responsible: PropTypesPlus.locale.isRequired,
    update: PropTypesPlus.locale.isRequired,
  }),
};

FormAction.defaultProps = {
  locale,
};

export default FormAction;
