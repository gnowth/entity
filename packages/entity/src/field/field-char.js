import { List } from 'immutable';

import AnyField from './field-any';

export default class CharField extends AnyField {
  constructor(options = {}) {
    super({ type: 'char', ...options });
  }

  default() {
    return this.many ? List() : '';
  }
}
