// Temporary eslint disable
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import { PropTypesEntity } from 'lib/react-entities';
import { withSubscribers } from 'lib/react-broadcasts';

export default function () {
  return (ComposedComponent) => {
    class withFieldProps extends React.Component {
      static propTypes = {
        formFormName: PropTypes.string,
        formRecord: PropTypesImmutable.map.isRequired,
        formField: PropTypesEntity.field,
        formOnChange: PropTypes.func.isRequired,
        formFormProps: PropTypes.shape({}).isRequired,

        formName: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        field: PropTypesEntity.field,
        record: PropTypesImmutable.map,
        onChange: PropTypes.func,
        component: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.string,
        ]),
      };

      static defaultProps = {
        formName: '',
        value: undefined,
        field: undefined,
        record: undefined,
        onChange: undefined,
        formFormName: '',
        formField: null,
        component: null,
      };

      render() {
        const { formFormName, formRecord, formField, formOnChange, formFormProps, formName, name, value, record, field, onChange, component, ...props } = this.props;
        const fieldRecord = record || formRecord;
        const fieldValue = value === undefined ? fieldRecord.get(name) : value;
        const fieldField = field || (formField && formField.entity.fields[name]);
        const fieldOnChange = onChange || formOnChange;

        const handleChange = ({ target: { name: inputName, value: inputValue } }) => {
          const nextValue = fieldField.valueWillChange({
            value: fieldValue,
            record: fieldRecord,
            formProps: formFormProps,
            nextValue: inputValue,
            fieldProps: props,
          });

          fieldOnChange({ target: { name: inputName, value: nextValue } });
        };

        const componentProps = Object.assign(
          {
            name,
            value: fieldValue,
            formField,
            formName: formName || formFormName,
            field: fieldField,
            record: fieldRecord,
            onChange: fieldField ? handleChange : fieldOnChange,
            formProps: formFormProps,
            component: component || formField.entity.getWidget({
              formName: formName || formFormName,
              fieldName: name,
              value: fieldValue,
              record: fieldRecord,
              formProps: formFormProps,
              fieldProps: props,
            }),
          },
          props,
        );

        return (
          <ComposedComponent {...componentProps} />
        );
      }
    }

    return withSubscribers([
      'formFormName',
      'formRecord',
      'formOnChange',
      'formField',
      'formFormProps',
    ])(withFieldProps);
  };
}
