import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form } from '@entity/form';
import { useDefaultStyle } from '@gnowth/style';
import { UIButton, UISpacer } from '@gnowth/ui';

import defaultLocales from './Controls.locales';
import defaultStyles, { Controls } from './Controls.styles';

function FormControls(props) {
  const locales = { ...defaultLocales, ...props.locales };
  const styles = useDefaultStyle(defaultStyles, props.styles);
  const ExtraControlsComponent = props.extraControlsComponent;

  return (
    <Form {...props}>
      { !props.resetHidden && (
        <Control
          action={props.resetAction}
          component={props.buttonComponent}
          componentProps={{
            locale: locales.reset,
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
            css: styles.buttons,
            locale: locales.save,
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
            locale: locales.submit,
            ...props.submitButtonComponentProps,
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
