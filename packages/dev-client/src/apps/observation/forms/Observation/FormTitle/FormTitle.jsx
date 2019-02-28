import _identity from 'lodash/identity';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIFlexBox, UIButton } from '@gnowth/ui';
import { useEnhance } from '@private/hooks';

import locales from './FormTitle.locales';

function FormTitle(props) {
  const enhancedProps = useEnhance(props, { locales });

  return (
    <Form {...enhancedProps.props}>
      <Input
        name="title"
        wrapperComponentProps={{ label: enhancedProps.locales.label_title }}
      />

      <UIFlexBox justifyContent="flex-end">
        <UIButton
          content={enhancedProps.locales.button_cancel}
          onClick={enhancedProps.props.onClose}
        />

        <Control
          action={({ value }) => enhancedProps.props.onClose(value)}
          componentProps={{ content: enhancedProps.locales.button_ok }}
          submit
        />
      </UIFlexBox>
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
