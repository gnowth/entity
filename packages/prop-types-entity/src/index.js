import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { Entity, Fields } from '@entity/core';

const isEntity = (props, propName, componentName) => (
  !props[propName] || Entity.isEntity(props[propName])
    ? undefined
    : new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`)
);

// const hasInterface = shape => (props, propName, componentName) => _mapValues(
//   shape,
//   (value, key) => value(props[propName], key, componentName)
//   props[propName]
//   && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);

// TODO maybe convert entity to shape?
export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(Fields.EntityField),
  entityFieldWithInterface: () => PropTypesPlus.allOfType([
    PropTypes.instanceOf(Fields.EntityField),
    // PropTypes.shape({
    //   entity: PropTypes.shape(shape),
    // }),
  ]),
  field: PropTypes.instanceOf(Fields.Field),
};
