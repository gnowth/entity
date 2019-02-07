import _isString from 'lodash/isString';
import { Entity } from '@entity/core';
import Duck from '@entity/duck';
import { fromJS, List, Map } from 'immutable';
import { stringify } from 'query-string';

import reducerClear from './reducer-clear';
import reducerGet from './reducer-get';
import reducerOptions from './reducer-options';
import reducerSave from './reducer-save';
import reducerDelete from './reducer-delete';
import Action from './action';
import Queries from './queries';
import Selectors from './selectors';

export default class DuckDRF extends Duck {
  static namespace = 'dango_rest_framework';

  static Action = Action

  static Queries = Queries

  static Selectors = Selectors

  static getActions(configs = {}) {
    return {
      clear: this.makeAction({ hasPayload: false }),

      delete: this.makeAction({
        defaultMeta: { sideEffect: true },
        metaFromPayload: payload => ({ id: configs.entity?.getId(payload) }),
      }),
      delete_rejected: this.makeAction(),
      delete_resolved: this.makeAction(),

      get: this.makeAction({
        hasPayload: false,
        metaFromPayload: (payload = {}) => ({ sideEffect: payload.id !== null }),
      }),
      get_rejected: this.makeAction(),
      get_resolved: this.makeAction(),

      options: this.makeAction({
        defaultMeta: { sideEffect: true },
        hasPayload: false,
      }),
      options_rejected: this.makeAction(),
      options_resolved: this.makeAction(),

      save: this.makeAction({
        defaultMeta: { sideEffect: true },
        metaFromPayload: payload => ({
          id: configs.entity?.getId(payload) || null,
          method: configs.entity?.getId(payload) ? 'put' : 'post',
        }),
      }),
      save_local: this.makeAction(),
      save_rejected: this.makeAction(),
      save_resolved: this.makeAction(),
    };
  }

  static getInitialState(configs = {}) {
    const initialRecord = configs.entity?.dataToRecord({});

    return Map({
      detail: Map({ [configs.ID_NULL]: initialRecord }),
      detail_dirty: Map({ [configs.ID_NULL]: initialRecord }),
      detail_errors: Map(),
      list: Map(),
      list_dirty: Map(),
      list_errors: Map(),
      options: Map(),
      options_errors: Map(),
      status: Map({
        deleting: Map(),
        deletingDidFail: Map(),
        getting: Map(),
        gettingDidFail: Map(),
        optioning: Map(),
        optioningDidFail: Map(),
        saving: Map(),
        savingDidFail: Map(),
      }),
    });
  }

  static getReducers(types, initialState) {
    return {
      ...reducerClear(types, initialState),
      ...reducerGet(types, initialState),
      ...reducerOptions(types, initialState),
      ...reducerSave(types, initialState),
      ...reducerDelete(types, initialState),
    };
  }

  constructor(configs = {}) {
    super({
      name: configs.entity?.name,
      ID_NULL: 'id_null',
      ...configs,
    });

    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(configs.entity?.paths?.apiBase)) throw new Error(`RestDuck.constructor (${configs.entity?.name}): "apiBase" of "entity" option must start with a "/" and end with a "/"`);
      if (!configs.entity || !Entity.isEntity(configs.entity)) throw new Error(`${this.constructor.name}.constructor: "entity" option must be child of "Entity"`);
    }
  }

  getId({ id = '' } = {}) {
    return id === null ? this.ID_NULL : id;
  }

  getIdentifier({ id = '', tag = '', params = Map(), method = 'get', action = '' }) {
    if (process.env.NODE_ENV !== 'production') {
      if (!Map.isMap(params)) throw new Error('getIdentifier: "params" options must be an immutable map');

      const invalidParams = params.filterNot((param = '') => _isString(param)).toKeyedSeq();
      if (invalidParams.size > 0) throw new Error(`getIdentifier (${invalidParams.join(', ')}): params must be a string or undefined`);
    }

    const paramsString = stringify(params.filter(p => p).toJS());

    const paramsFrag = paramsString && `.${paramsString}`;
    const actionFrag = action && `.${action}`;
    const tagFrag = tag && `.${tag}`;
    const idFrag = id === null ? `.${this.ID_NULL}` : `.${id}`;

    return `${method}${actionFrag}${tagFrag}${idFrag}${paramsFrag}`;
  }

  getErrors(error) {
    return List([
      !error.response
        && (error.message || 'Unknown Error'),

      error.response?.state === 0
        && 'Error 0: A fatal error occurred.',

      error.response?.status === 401
        && `Error 401: ${error.response.data.detail || error.response.data}`,

      error.response?.status === 403
        && `Error 403: ${error.response.data.detail || error.response.data}`,

      error.response?.status === 404
        && 'Error 404: Not found.',

      error.response?.status >= 500
        && error.response.status < 600
        && `Error ${error.response.status}: A server error occurred.`,

      error.response?.data
        && error.response.status !== 401
        && error.response.status !== 403
        && fromJS({
          api: true,
          detail: true,
          message: 'Invalid Fields',
          errors: error.response.data,
        }),
    ]).filter(e => e);
  }

  reject(action, error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error); // eslint-disable-line no-console
    }

    return this.actions[`${action.name}_rejected`](error, {
      ...action.meta,
      response: error.response,
      sideEffect: false,
    });
  }

  resolve(action, response) {
    return this.actions[`${action.name}_resolved`](response.data, {
      ...action.meta,
      response,
      sideEffect: false,
    });
  }
}
