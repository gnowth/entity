import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIIcon, UIType } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';

import locales from './Action.locales';
import styles, { Controls, Header } from './Action.styles';

function FormAction(props) {
  const enhancedProps = useEnhance(props, { locales, styles });

  return (
    <Form {...enhancedProps}>
      <Header>
        <UIType
          value={enhancedProps.locales.header_title}
          variant="h4"
        />

        { enhancedProps.records && enhancedProps.index !== null && (
          <Control
            action={({ value, field, ...options }) => field.entity.actionArrayDeleteAtIndexOrdered(enhancedProps.records, { ...options, index: enhancedProps.index })}
            component={UIIcon}
            componentProps={{ name: 'delete', material: true }}
            array
          />
        )}
      </Header>

      <Input
        name="person_responsible"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          labelLocale: enhancedProps.locales.person_responsible,
        }}
      />

      <Input
        name="date_due"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          labelLocale: enhancedProps.locales.date_due,
        }}
      />

      <Input
        name="completed_by"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          labelLocale: enhancedProps.locales.completed_by,
        }}
      />

      <Input
        name="date_completed"
        wrapperComponentProps={{
          css: enhancedProps.styles.input,
          labelLocale: enhancedProps.locales.date_completed,
        }}
      />

      <Controls>
        <Control
          action={({ value, field, ...options }) => field.entity.actionUpdate(value, options)}
          componentProps={{
            content: enhancedProps.locales.update,
            css: enhancedProps.styles.control,
          }}
        />

        <Control
          action={({ value, field, ...options }) => field.entity.actionComplete(value, options)}
          componentProps={{
            content: enhancedProps.locales.complete,
            css: enhancedProps.styles.control,
          }}
        />
      </Controls>
    </Form>
  );
}

FormAction.propTypes = {
  field: PropTypesEntity.entityFieldWithInterface({
    actionComplete: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    actionUpdate: PropTypes.func.isRequired,
  }).isRequired,

  index: PropTypes.number,

  locales: PropTypes.exact({
    complete: PropTypesPlus.locale,
    completed_by: PropTypesPlus.locale,
    date_completed: PropTypesPlus.locale,
    date_due: PropTypesPlus.locale,
    header_title: PropTypesPlus.locale,
    person_responsible: PropTypesPlus.locale,
    update: PropTypesPlus.locale,
  }),

  records: PropTypesImmutable.list,

  styles: PropTypes.exact({
    control: PropTypesPlus.css,
    input: PropTypesPlus.css,
  }),
};

FormAction.defaultProps = {
  index: null,
  locales: undefined,
  records: undefined,
  styles: undefined,
};

export default React.memo(FormAction);
