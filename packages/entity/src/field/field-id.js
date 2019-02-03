import AnyField from './field-any';

export default class IdField extends AnyField {
  constructor(configs = {}) {
    super(configs);

    if (process.env.NODE_ENV !== 'production') {
      if (configs.many) throw new Error(`${this.constructor.name}.constructor: "many" option is not supported.`);
    }
  }

  dataToValue(data) {
    return data?.toString();
  }

  default() {
    return undefined;
  }
}
