import { Map } from 'immutable';

export default class {
  constructor(configs) {
    Object.assign(this, configs);
  }

  getState(state) {
    return state.getIn([this.app, this.namespace, this.name], Map());
  }
}
