import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Control, Form } from '@gnowth/entity-form';
import { UIButton, UIIcon, UISpacer } from '@gnowth/ui';
import { FormattedMessage } from 'react-intl';

import locale from './locale';

const FormToolbarControls = props => (
  <Form {...props}>
    <Control
      action={props.resetAction}
      component={props.buttonComponent}
      componentProps={props.resetButtonComponentProps}
      hidden={props.resetHidden}
    />

    <props.extraControls />

    <Control
      action={props.saveAction}
      component={props.buttonComponent}
      componentProps={props.saveButtonComponentProps}
      hidden={props.saveHidden}
    />

    <Control
      action={props.submitAction}
      component={props.buttonComponent}
      componentProps={props.submitButtonComponentProps}
      hidden={props.submitHidden}
    />
  </Form>
);

FormToolbarControls.propTypes = {
  // Controls
  buttonComponent: PropTypes.func,
  extraControls: PropTypes.func,

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
  extraControls: UISpacer,

  resetAction: ({ value, field, ...options }) => field.entity.actionReset(value, options),
  resetButtonComponentProps: {
    label: <FormattedMessage {...locale.reset} />,
    labelResponsive: <UIIcon name="refresh" />,
    media: theme => `(min-width: ${theme.vars.size.small}`,
    theme: theme => theme.components.buttonSecondary,
  },
  resetHidden: false,

  saveAction: ({ value, field, ...options }) => field.entity.actionSave(value, options),
  saveButtonComponentProps: {
    label: <FormattedMessage {...locale.save} />,
    labelResponsive: <UIIcon name="save" />,
    media: theme => `(min-width: ${theme.vars.size.small}`,
  },
  saveHidden: false,

  submitAction: ({ value, field, ...options }) => field.entity.actionSubmit(value, options),
  submitButtonComponentProps: {
    label: <FormattedMessage {...locale.submit} />,
  },
  submitHidden: false,
};

export default FormToolbarControls;
