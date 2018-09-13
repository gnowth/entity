export class Specification {
  static fromEntity() {
    return new Specification();
  }

  constructor(options) {
    Object.assign(this, options);
    this.options = options;
  }

  extend(options) {
    return new Specification(Object.assign(
      {},
      this.options,
      options,
    ));
  }
}

export default Specification;
