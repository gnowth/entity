import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { Entity, Fields } from '@entity/core';

const isEntity = (props, propName, componentName) => (
  !props[propName] || Entity.isEntity(props[propName])
    ? undefined
    : new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`)
);

export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(Fields.EntityField),
  entityFieldWithInterface: () => PropTypesPlus.allOfType([
    PropTypes.instanceOf(Fields.EntityField),
  ]),
  field: PropTypes.instanceOf(Fields.Field),
};
