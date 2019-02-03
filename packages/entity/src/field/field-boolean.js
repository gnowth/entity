import AnyField from './field-any';

export default class BooleanField extends AnyField {
  constructor(configs = {}) {
    super({ type: 'boolean', ...configs });
  }
}
