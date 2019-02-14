import _isString from 'lodash/isString';
import axios from 'axios';
import Duck from '@entity/duck';
import { Map } from 'immutable';

export default {
  ...Duck.Action,

  init(...args) {
    this.defaultMeta = {
      method: this.name,
      ...this.defaultMeta,
    };

    Duck.Action.init.call(this, ...args);

    return this;
  },

  effect(store) {
    if (!this.meta?.sideEffect) return Duck.Action.effect.call(this, store);

    const params = this.meta?.params || Map();

    if (process.env.NODE_ENV !== 'production') {
      if (!Map.isMap(params)) throw new Error('DuckMiddleware.action.meta: "params" options must be an immutable map');

      const invalidParams = params.filterNot((param = '') => _isString(param)).toKeyedSeq();
      if (invalidParams.size > 0) throw new Error(`DuckMiddleware.action.meta (${invalidParams.join(', ')}): params must be a string or undefined`);
    }

    const customAction = this.meta?.action ? `${this.meta?.action}/` : '';

    const args = [
      this.meta?.id
        ? `${this.duck?.entity?.paths?.apiBase}${this.meta?.id}/${customAction}`
        : `${this.duck?.entity?.paths?.apiBase}${customAction}`,
      ...(this.payload ? [this.duck?.entity?.toData(this.payload)] : []),
      {
        params: params.filter(p => p).toJS(),
      },
    ];

    this.promise = axios[this.meta?.method || this.name]
      .apply(null, args)
      .then(response => store.dispatch(this.duck.resolve(this, response)))
      .catch(error => store.dispatch(this.duck.reject(this, error)))
      .catch(console.error); // eslint-disable-line no-console

    return this;
  },
};
