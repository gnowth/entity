import PropTypes from 'prop-types';

import { Entity, Fields } from '@gnowth/entity';
import PropTypesPlus from 'lib/prop-types/Plus';

const isEntity = (props, propName, componentName) => !Entity.isEntity(props[propName])
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);

export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(Fields.EntityField),
  field: PropTypes.instanceOf(Fields.Field),
};
