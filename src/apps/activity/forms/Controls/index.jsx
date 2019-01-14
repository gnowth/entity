import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { UIButton, UISpacer } from '@gnowth/ui';

import locales from './locales';
import styles, { Controls } from './styles';

const FormControls = (props) => {
  const ExtraControlsComponent = props.extraControlsComponent;

  return (
    <Form {...props}>
      { !props.resetHidden && (
        <Control
          action={props.resetAction}
          component={props.buttonComponent}
          componentProps={{
            locale: props.locales.reset,
            ...props.resetButtonComponentProps,
          }}
        />
      )}

      <ExtraControlsComponent />

      { !props.saveHidden && (
        <Control
          action={props.saveAction}
          component={props.buttonComponent}
          componentProps={{
            css: props.styles.buttons,
            locale: props.locales.save,
            ...props.saveButtonComponentProps,
          }}
        />
      )}

      { !props.submitHidden && (
        <Control
          action={props.submitAction}
          component={props.buttonComponent}
          componentProps={{
            css: props.styles.buttons,
            locale: props.locales.submit,
            ...props.submitButtonComponentProps,
          }}
        />
      )}
    </Form>
  );
};

FormControls.propTypes = {
  buttonComponent: PropTypesPlus.component,
  component: PropTypesPlus.component,
  extraControlsComponent: PropTypesPlus.component,
  field: PropTypesEntity.entityFieldWithInterface({
    actionReset: PropTypes.func.isRequired,
    actionSave: PropTypes.func.isRequired,
    actionSubmit: PropTypes.func.isRequired,
  }).isRequired,
  locales: PropTypes.exact({
    reset: PropTypesPlus.locale.isRequired,
    save: PropTypesPlus.locale.isRequired,
    submit: PropTypesPlus.locale.isRequired,
  }),
  resetAction: PropTypes.func,
  resetButtonComponentProps: PropTypes.shape({}),
  resetHidden: PropTypes.bool,
  saveAction: PropTypes.func,
  saveButtonComponentProps: PropTypes.shape({}),
  saveHidden: PropTypes.bool,
  styles: PropTypes.exact({
    buttons: PropTypesPlus.css,
  }),
  submitAction: PropTypes.func,
  submitButtonComponentProps: PropTypes.shape({}),
  submitHidden: PropTypes.bool,
  value: PropTypesImmutable.map.isRequired,
};

FormControls.defaultProps = {
  locales,
  styles,
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
