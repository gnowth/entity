import PropTypes from 'prop-types';

import { Entity } from '../../../entity/src/entities';
import { Field, EntityField } from '../../../entity/src/fields';
import PropTypesPlus from '../Plus';

const isEntity = (props, propName, componentName) => !Entity.isEntity(props[propName])
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);

export default {
  entity: PropTypesPlus.withRequired(isEntity),
  entityField: PropTypes.instanceOf(EntityField),
  field: PropTypes.instanceOf(Field),
};
