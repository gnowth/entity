import _ from 'lodash';
import Duck from '@burnsred/entity-duck';
import { Map } from 'immutable';

export default {
  ...Duck.Action,

  init(...args) {
    this.defaultMeta = {
      method: this.name, // TODO might not be needed.
      ...this.defaultMeta,
    };

    Duck.Action.init.call(this, ...args);

    return this;
  },

  effect(store, configs = {}) {
    if (!this.meta.sideEffect) return Duck.Action.effect.call(this, store);

    const params = this.meta.params || Map();

    if (process.env.NODE_ENV !== 'production') {
      if (!Map.isMap(params)) throw new Error('DuckMiddleware.action.meta: "params" options must be an immutable map');

      const invalidParams = params.filterNot((param = '') => _.isString(param)).toKeyedSeq();
      if (invalidParams.size > 0) throw new Error(`DuckMiddleware.action.meta (${invalidParams.join(', ')}): params must be a string or undefined`);
    }

    const customAction = this.meta.action ? `${this.meta.action}/` : '';

    const path = this.duck && this.duck.entity.getPaths(configs).apiBase;

    const args = [
      this.meta.id
        ? `${path}${this.meta.id}/${customAction}`
        : `${path}${customAction}`,
      ...(this.payload ? [this.duck && this.duck.entity.toData(this.payload)] : []),
      configs.client.mocking
        ? {
          configs,
          store,
          action: this,
          params: params.filter(p => p).toJS(),
        }
        : {
          params: params.filter(p => p).toJS(),
        },
    ];

    this.promise = configs.client[this.meta.method || this.name](...args)
      .then(response => store.dispatch(this.duck.resolve(this, response)))
      .catch(error => store.dispatch(this.duck.reject(this, error)))
      .catch(console.error); // eslint-disable-line no-console

    return this;
  },
};
