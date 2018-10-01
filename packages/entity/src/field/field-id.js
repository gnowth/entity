export default class IdField extends AnyField {
  constructor(options = {}) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (options.many) throw new Error('"many" option is not supported for "IdField"');
    }
  }

  default() { // eslint-disable-line class-methods-use-this
    return undefined;
  }
}