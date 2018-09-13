import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { Form, Input } from 'lib/entity-form';

const FormBasic = props => (
  <Form {...props}>
    <Input
      name="char1"
      label="Char1 Label"
      widget="input"
    />

    <Input
      name="char2"
      label="Char2 Label"
      widget="input"
    />
  </Form>
);

FormBasic.propTypes = {
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormBasic;
