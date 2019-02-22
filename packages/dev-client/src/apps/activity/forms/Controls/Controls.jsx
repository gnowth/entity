import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { UIButton, UISpacer } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';

import locales from './Controls.locales';
import styles, { Controls } from './Controls.styles';

function FormControls(props) {
  const enhancedProps = useEnhance(props, { locales, styles });
  const ExtraControlsComponent = enhancedProps.extraControlsComponent;

  return (
    <Form {...props}>
      { !enhancedProps.resetHidden && (
        <Control
          action={enhancedProps.resetAction}
          component={enhancedProps.buttonComponent}
          componentProps={{
            content: enhancedProps.locales.reset,
            ...enhancedProps.resetButtonComponentProps,
          }}
        />
      )}

      <ExtraControlsComponent />

      { !enhancedProps.saveHidden && (
        <Control
          action={enhancedProps.saveAction}
          component={enhancedProps.buttonComponent}
          componentProps={{
            content: enhancedProps.locales.save,
            css: enhancedProps.styles.buttons,
            ...enhancedProps.saveButtonComponentProps,
          }}
        />
      )}

      { !enhancedProps.submitHidden && (
        <Control
          action={enhancedProps.submitAction}
          component={enhancedProps.buttonComponent}
          componentProps={{
            content: enhancedProps.locales.submit,
            css: enhancedProps.styles.buttons,
            palette: 'primary',
            variant: 'contained',
            ...enhancedProps.submitButtonComponentProps,
          }}
        />
      )}
    </Form>
  );
}

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
    reset: PropTypesPlus.locale,
    save: PropTypesPlus.locale,
    submit: PropTypesPlus.locale,
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
  buttonComponent: UIButton,
  component: Controls,
  extraControlsComponent: UISpacer,
  locales: undefined,
  resetAction: ({ value, field, ...configs }) => field.entity.actionReset(value, configs),
  resetButtonComponentProps: {},
  resetHidden: false,
  saveAction: ({ value, field, ...configs }) => field.entity.actionSave(value, configs),
  saveButtonComponentProps: {},
  saveHidden: false,
  styles: undefined,
  submitAction: ({ value, field, ...configs }) => field.entity.actionSubmit(value, configs),
  submitButtonComponentProps: {},
  submitHidden: false,
};

export default React.memo(FormControls);
