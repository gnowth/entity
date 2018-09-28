import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesLocale from '@gnowth/prop-types-locale';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIIcon, UITypeSet } from '@gnowth/ui';

import locale from './locale';
import S from './style';

const FormAction = props => (
  <Form {...props}>
    <S.Header>
      <UITypeSet name="header_title" {...props.locale.header_title} />

      <Control
        action={({ value, field, ...options }) => field.entity.actionDelete(value, options)}
        componentProps={{
          labelResponsive: <UIIcon name="delete" />,
        }}
      />
    </S.Header>

    <Input
      name="person_responsible"
      wrapperProps={{ labelLocale: props.locale.person_responsible }}
    />

    <Input
      name="due_date"
      wrapperProps={{ labelLocale: props.locale.due_date }}
    />

    <Input
      name="completed_by"
      wrapperProps={{ labelLocale: props.locale.due_date }}
    />

    <Input
      name="completed_date"
      wrapperProps={{ labelLocale: props.locale.completed_date }}
    />

    <S.Controls>
      <Control
        action={({ value, field, ...options }) => field.entity.actionCancel(value, options)}
        componentProps={{ labelLocale: props.locale.cancel }}
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionUpdate(value, options)}
        componentProps={{ labelLocale: props.locale.update }}
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionComplete(value, options)}
        componentProps={{ labelLocale: props.locale.complete }}
      />
    </S.Controls>
  </Form>
);

FormAction.propTypes = {
  field: PropTypesEntity.entityFieldWithInterface({
    actionCancel: PropTypes.func.isRequired,
    actionComplete: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    actionUpdate: PropTypes.func.isRequired,
  }).isRequired,

  locale: PropTypes.shape({
    cancel: PropTypesLocale.locale.isRequired,
    complete: PropTypesLocale.locale.isRequired,
    completed_by: PropTypesLocale.locale.isRequired,
    completed_date: PropTypesLocale.locale.isRequired,
    due_date: PropTypesLocale.locale.isRequired,
    header_title: PropTypesLocale.locale.isRequired,
    person_responsible: PropTypesLocale.locale.isRequired,
    update: PropTypesLocale.locale.isRequired,
  }),
};

FormAction.defaultProps = {
  locale,

  // deleteAction: ({ value, field, ...options }) => field.entity.actionDelete(value, options),
  // deleteButtonComponentProps: {
  //   labelResponsive: <UIIcon name="delete" />,
  //   media: theme => theme.media.all,
  // },
};

export default FormAction;
