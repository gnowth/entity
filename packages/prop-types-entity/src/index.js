import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { Entity, EntityField, Field } from '@gnowth/entity';

const isEntity = (props, propName, componentName) => !Entity.isEntity(props[propName])
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);

export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(EntityField),
  field: PropTypes.instanceOf(Field),
};
