import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { UIButton, UISpacer } from '@gnowth/ui';

import locale from './locale';
import styles, { Controls } from './styles';

const FormControls = props => (
  <Form {...props}>
    { !props.resetHidden && (
      <Control
        action={props.resetAction}
        component={props.buttonComponent}
        componentProps={{
          locale: locale.reset,
          ...props.resetButtonComponentProps,
        }}
      />
    )}

    <props.extraControlsComponent />

    { !props.saveHidden && (
      <Control
        action={props.saveAction}
        component={props.buttonComponent}
        componentProps={{
          css: styles.buttons,
          locale: locale.save,
          ...props.saveButtonComponentProps,
        }}
      />
    )}

    { !props.submitHidden && (
      <Control
        action={props.submitAction}
        component={props.buttonComponent}
        componentProps={{
          css: styles.buttons,
          locale: locale.submit,
          ...props.submitButtonComponentProps,
        }}
      />
    )}
  </Form>
);

FormControls.propTypes = {
  buttonComponent: PropTypesPlus.component,
  component: PropTypesPlus.component,
  extraControlsComponent: PropTypesPlus.component,
  field: PropTypesEntity.entityFieldWithInterface({
    actionReset: PropTypes.func.isRequired,
    actionSave: PropTypes.func.isRequired,
    actionSubmit: PropTypes.func.isRequired,
  }).isRequired,
  resetAction: PropTypes.func,
  resetButtonComponentProps: PropTypes.shape({}),
  resetHidden: PropTypes.bool,
  saveAction: PropTypes.func,
  saveButtonComponentProps: PropTypes.shape({}),
  saveHidden: PropTypes.bool,
  submitAction: PropTypes.func,
  submitButtonComponentProps: PropTypes.shape({}),
  submitHidden: PropTypes.bool,
  value: PropTypesImmutable.map.isRequired,
};

FormControls.defaultProps = {
  buttonComponent: UIButton,
  component: Controls,
  extraControlsComponent: UISpacer,
  resetAction: ({ value, field, ...options }) => field.entity.actionReset(value, options),
  resetButtonComponentProps: {},
  resetHidden: false,
  saveAction: ({ value, field, ...options }) => field.entity.actionSave(value, options),
  saveButtonComponentProps: {},
  saveHidden: false,
  submitAction: ({ value, field, ...options }) => field.entity.actionSubmit(value, options),
  submitButtonComponentProps: {},
  submitHidden: false,
};

export default FormControls;
