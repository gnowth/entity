export default class EntityIdField extends EntityField {
  static type = 'entityid';

  constructor(options = {}) {
    super({
      ...options,
      preventEntityValidators: true,
    });

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity) throw new Error('entity option is required when extending EntityIdField');
    }
  }

  dataToValue(data = null) { // eslint-disable-line class-methods-use-this
    return fromJS(data);
  }

  default() { // eslint-disable-line class-methods-use-this
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterParamsId() {
    return Map();
  }

  valueToData(value) { // eslint-disable-line lodash-fp/prefer-identity, class-methods-use-this
    return value;
  }

  valueToParam(value = null) {
    if (value === null) return undefined;

    return this.toString(value);
  }
}
