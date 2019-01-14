import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIIcon, UITypeSet } from '@gnowth/ui';

import locales from './locales';
import styles, { Controls, Header } from './styles';

const FormAction = props => (
  <Form {...props}>
    <Header>
      <UITypeSet locale={props.locales.header_title} variant="header_title" />

      { props.records && props.index !== null && (
        <Control
          action={({ value, field, ...options }) => field.entity.actionArrayDeleteAtIndexOrdered(props.records, { ...options, index: props.index })}
          component={UIIcon}
          componentProps={{ name: 'delete' }}
          array
        />
      )}
    </Header>

    <Input
      name="person_responsible"
      wrapperComponentProps={{
        css: props.styles.input,
        labelLocale: props.locales.person_responsible,
      }}
    />

    <Input
      name="date_due"
      wrapperComponentProps={{
        css: props.styles.input,
        labelLocale: props.locales.date_due,
      }}
    />

    <Input
      name="completed_by"
      wrapperComponentProps={{
        css: props.styles.input,
        labelLocale: props.locales.completed_by,
      }}
    />

    <Input
      name="date_completed"
      wrapperComponentProps={{
        css: props.styles.input,
        labelLocale: props.locales.date_completed,
      }}
    />

    <Controls>
      <Control
        action={({ value, field, ...options }) => field.entity.actionUpdate(value, options)}
        componentProps={{
          css: props.styles.control,
          locale: props.locales.update,
        }}
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionComplete(value, options)}
        componentProps={{
          css: props.styles.control,
          locale: props.locales.complete,
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

  index: PropTypes.number,

  locales: PropTypes.exact({
    complete: PropTypesPlus.locale.isRequired,
    completed_by: PropTypesPlus.locale.isRequired,
    date_completed: PropTypesPlus.locale.isRequired,
    date_due: PropTypesPlus.locale.isRequired,
    header_title: PropTypesPlus.locale.isRequired,
    person_responsible: PropTypesPlus.locale.isRequired,
    update: PropTypesPlus.locale.isRequired,
  }),

  records: PropTypesImmutable.list,

  styles: PropTypes.exact({
    control: PropTypesPlus.css.isRequired,
    input: PropTypesPlus.css.isRequired,
  }),
};

FormAction.defaultProps = {
  locales,
  styles,
  index: null,
  records: undefined,
};

export default FormAction;
