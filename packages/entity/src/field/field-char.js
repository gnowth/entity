import { List } from 'immutable';

import AnyField from './field-any';

export default class CharField extends AnyField {
  constructor(configs = {}) {
    super({ type: 'char', ...configs });
  }

  default() {
    return this.many ? List() : '';
  }
}
