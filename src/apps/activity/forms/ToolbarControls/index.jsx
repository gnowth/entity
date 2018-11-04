import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { UIButton, UISpacer } from '@gnowth/ui';
import { FormattedMessage } from 'react-intl';

import locale from './locale';
import styles, { Controls } from './styles';

const FormToolbarControls = props => (
  <Form {...props}>
    { !props.resetHidden && (
      <Control
        action={props.resetAction}
        component={props.buttonComponent}
        componentProps={props.resetButtonComponentProps}
      />
    )}

    <props.extraControlsComponent />

    { !props.saveHidden && (
      <Control
        action={props.saveAction}
        component={props.buttonComponent}
        componentProps={props.saveButtonComponentProps}
      />
    )}

    { !props.submitHidden && (
      <Control
        action={props.submitAction}
        component={props.buttonComponent}
        componentProps={props.submitButtonComponentProps}
      />
    )}
  </Form>
);

FormToolbarControls.propTypes = {
  // Controls
  buttonComponent: PropTypesPlus.component,
  component: PropTypesPlus.component,
  extraControlsComponent: PropTypesPlus.component,

  resetAction: PropTypes.func,
  resetButtonComponentProps: PropTypes.shape({}),
  resetHidden: PropTypes.bool,

  saveAction: PropTypes.func,
  saveButtonComponentProps: PropTypes.shape({}),
  saveHidden: PropTypes.bool,

  submitAction: PropTypes.func,
  submitButtonComponentProps: PropTypes.shape({}),
  submitHidden: PropTypes.bool,

  // Forms
  field: PropTypesEntity.entityFieldWithInterface({
    actionReset: PropTypes.func.isRequired,
    actionSave: PropTypes.func.isRequired,
    actionSubmit: PropTypes.func.isRequired,
  }).isRequired,
  value: PropTypesImmutable.map.isRequired,
};

FormToolbarControls.defaultProps = {
  buttonComponent: UIButton,
  component: Controls,
  extraControlsComponent: UISpacer,

  resetAction: ({ value, field, ...options }) => field.entity.actionReset(value, options),
  resetButtonComponentProps: {
    locale: locale.reset,
  },
  resetHidden: false,

  saveAction: ({ value, field, ...options }) => field.entity.actionSave(value, options),
  saveButtonComponentProps: {
    css: styles.buttons,
    locale: locale.save,
  },
  saveHidden: false,

  submitAction: ({ value, field, ...options }) => field.entity.actionSubmit(value, options),
  submitButtonComponentProps: {
    css: styles.buttons,
    locale: locale.submit,
  },
  submitHidden: false,
};

export default FormToolbarControls;
