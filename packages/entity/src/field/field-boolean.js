import AnyField from './field-any';

export default class BooleanField extends AnyField {
  constructor(options) {
    super(Object.assign({ type: 'boolean' }, options));
  }
}
