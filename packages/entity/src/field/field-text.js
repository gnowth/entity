export default class TextField extends AnyField {
  static type = 'text';

  default() {
    return this.many ? List() : '';
  }
}
