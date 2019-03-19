import _ from 'lodash';
import idx from 'idx';
import AnyField from './field-any';

export default class IdField extends AnyField {
  constructor(configs = {}) {
    super(configs);

    if (process.env.NODE_ENV !== 'production') {
      if (configs.many) throw new Error(`${this.constructor.name}.constructor: "many" option is not supported.`);
    }
  }

  dataToValue(data) {
    return _.isFunction(idx(data, x => x.toString))
      ? data.toString()
      : data;
  }

  default() {
    return undefined;
  }
}
