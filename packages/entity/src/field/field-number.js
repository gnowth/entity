import AnyField from './field-any';

export default class NumberField extends AnyField {
  constructor(options = {}) {
    super({ type: 'number', ...options });
  }
}
