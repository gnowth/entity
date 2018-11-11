import AnyField from './field-any';

export default class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error('entity[IdField]: "many" option is not supported.');
    }
  }

  dataToValue(data) { // TODO maybe check if data can be converted into a string;
    return data?.toString();
  }

  default() {
    return undefined;
  }
}
