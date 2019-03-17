import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Control, Form, Input } from '@entity/form';
import { UIFlexBox, UIButton } from '@gnowth/ui';

import locales from './FormTitle.locales';

const FormTitle = props => (
  <Form {...props}>
    <Input
      name="title"
      wrapperComponentProps={{ label: locales.label_title }}
    />

    <UIFlexBox justifyContent="flex-end">
      <UIButton
        content={locales.button_cancel}
        onClick={props.onClose}
      />

      <Control
        action={({ value }) => props.onClose(value)}
        componentProps={{ content: locales.button_ok }}
        submit
      />
    </UIFlexBox>
  </Form>
);

FormTitle.propTypes = {
  onClose: PropTypes.func,
};

FormTitle.defaultProps = {
  onClose: _.identity,
};

export default React.memo(FormTitle);
