import _identity from 'lodash/identity';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIBox, UIButton } from '@gnowth/ui';

import defaultLocales from './FormTitle.locales';

function FormTitle(props) {
  const locales = { ...defaultLocales, ...props.locales };

  return (
    <Form {...props}>
      <Input
        name="title"
        wrapperComponentProps={{ labelLocale: locales.label_title }}
      />

      <UIBox justifyContent="flex-end">
        <UIButton
          content={locales.button_cancel}
          onClick={props.onClose}
        />

        <Control
          action={({ value }) => props.onClose(value)}
          componentProps={{ content: locales.button_ok }}
          submit
        />
      </UIBox>
    </Form>
  );
}

FormTitle.propTypes = {
  locales: PropTypes.exact({
    button_cancel: PropTypesPlus.locale,
    button_ok: PropTypesPlus.locale,
    label_title: PropTypesPlus.locale,
  }),
  onClose: PropTypes.func,
};

FormTitle.defaultProps = {
  locales: undefined,
  onClose: _identity,
};

export default React.memo(FormTitle);
