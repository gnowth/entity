import { List } from 'immutable';

import EntityField from './field-entity';
import EntityEnum from '../entity/entity-enum';

// TODO review
export default class EnumField extends EntityField {
  constructor(options) {
    const defaults = {
      entity: EntityEnum,
      type: 'enum',
    };

    super(Object.assign(defaults, options));
  }

  dataToValue(data = null) {
    return data && this.getOptions().find(option => this.entity.getId(option) === data);
  }

  default() {
    return this.many ? List() : null;
  }

  isEnumActive(value, { name }) {
    return this.many
      ? value.some(v => v.get('value') === name)
      : !!value && value.get('value') === name;
  }

  valueToData(value = null) {
    return value && this.entity.getId(value);
  }

  valueToParam(value = null) {
    return value === null
      ? undefined
      : this.entity.getId(value);
  }
}
