import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { UIButton, UISpacer } from '@gnowth/ui';

import locales from './Controls.locales';
import styles, { Controls } from './Controls.styles';

const FormControls = ({ extraControlsComponent: ExtraControlsComponent, ...props }) => (
  <Form {...props} css={props.css}>
    { !props.resetHidden && (
      <Control
        action={props.resetAction}
        component={props.buttonComponent}
        componentProps={{
          content: locales.reset,
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
          content: locales.save,
          css: styles.buttons,
          ...props.saveButtonComponentProps,
        }}
      />
    )}

    { !props.submitHidden && (
      <Control
        action={props.submitAction}
        component={props.buttonComponent}
        componentProps={{
          content: locales.submit,
          css: styles.buttons,
          palette: 'primary',
          variant: 'contained',
          ...props.submitButtonComponentProps,
        }}
      />
    )}
  </Form>
);

FormControls.propTypes = {
  buttonComponent: PropTypesPlus.component,
  component: PropTypesPlus.component,
  css: PropTypesPlus.css,
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
  css: undefined,
  extraControlsComponent: UISpacer,
  resetAction: ({ value, field, ...configs }) => field.entity.actionReset(value, configs),
  resetButtonComponentProps: {},
  resetHidden: false,
  saveAction: ({ value, field, ...configs }) => field.entity.actionSave(value, configs),
  saveButtonComponentProps: {},
  saveHidden: false,
  submitAction: ({ value, field, ...configs }) => field.entity.actionSubmit(value, configs),
  submitButtonComponentProps: {},
  submitHidden: false,
};

export default React.memo(FormControls);
