import PropTypes from 'prop-types';

import { Entity } from './entities';
import * as AllFields from './fields';

export * from './entities';
export const Fields = AllFields;

export const PropTypesEntity = {
  entity: (props, propName, componentName) => {
    if (Entity.isEntity(props[propName])) {
      throw new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
    }
  },
  field: PropTypes.instanceOf(Fields.Field),
};
