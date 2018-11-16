import AnyField from './field-any';

export default class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error(`${this.constructor.name}.constructor: "many" option is not supported.`);
    }
  }

  dataToValue(data) {
    return data?.toString();
  }

  default() {
    return undefined;
  }
}
