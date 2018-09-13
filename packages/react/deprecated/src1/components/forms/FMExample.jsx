import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { PropTypesEntity } from 'lib/react-entities';
import { Form, Field } from 'lib/react-forms';
import withHandleChangeDebounced from 'lib/react-hoc/withHandleChangeDebounced';

const FMExample = ({ formName, field, ...props }) => (
  <Form formName={formName} field={field} {...props}>
    { field.entity.forms[formName].orderedItems.map(key => (
      <div key={key}>
        <span>{key}</span>
        <Field name={key} />
      </div>
    ))}
  </Form>
);

FMExample.propTypes = {
  formName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypesImmutable.map.isRequired,
  field: PropTypesEntity.field.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withHandleChangeDebounced()(FMExample);
