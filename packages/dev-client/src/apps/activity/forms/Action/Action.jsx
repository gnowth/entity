import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIIcon, UIType } from '@gnowth/ui';

import locales from './Action.locales';
import styles, { Controls, Header } from './Action.styles';

const FormAction = props => (
  <Form {...props}>
    <Header>
      <UIType
        value={locales.header_title}
        variant="h4"
      />

      { props.records && props.index !== null && (
        <Control
          action={({ field, ...options }) => field.entity.actionArrayDeleteAtIndexOrdered(props.records, { ...options, index: props.index })}
          component={UIIcon}
          componentProps={{ name: 'delete', material: true }}
          array
        />
      )}
    </Header>

    <Input
      name="person_responsible"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.person_responsible,
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
      name="completed_by"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.completed_by,
      }}
    />

    <Input
      name="date_completed"
      wrapperComponentProps={{
        css: styles.input,
        label: locales.date_completed,
      }}
    />

    <Controls>
      <Control
        action={({ value, field, ...options }) => field.entity.actionUpdate(value, options)}
        componentProps={{
          content: locales.update,
          css: styles.control,
        }}
      />

      <Control
        action={({ value, field, ...options }) => field.entity.actionComplete(value, options)}
        componentProps={{
          content: locales.complete,
          css: styles.control,
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

  records: PropTypesImmutable.list,
};

FormAction.defaultProps = {
  index: null,
  records: undefined,
};

export default React.memo(FormAction);
