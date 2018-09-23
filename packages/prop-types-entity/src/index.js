import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { Entity, Fields } from '@gnowth/entity';

const isEntity = (props, propName, componentName) => !Entity.isEntity(props[propName])
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);

export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(Fields.EntityField),
  field: PropTypes.instanceOf(Fields.Field),
};
