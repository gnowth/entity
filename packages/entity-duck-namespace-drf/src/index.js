import { Duck } from '@entity/duck';
import { List, Map } from 'immutable';

import reducerClear from './reducer-clear';
import reducerGet from './reducer-get';
import reducerOptions from './reducer-options';
import reducerSave from './reducer-save';
import reducerDelete from './reducer-delete';
import { getId, getIdentifier, NULL_ID } from './utils';

export default class EntityDuck extends Duck {
  static namespace = 'dango_rest_framework';

  static actions = {
    clear: Duck.createAction(),

    delete_rejected: Duck.createAction(),
    delete_resolved: Duck.createAction(),
    delete: Duck.createAction({
      defaultMeta: ({ entity, payload }) => ({
        id: entity.getId(payload),
        keyProcessing: 'deleting',
        keyProcessingDidFail: 'deletingDidFail',
        method: 'delete',
        params: Map(),
        useDuckMiddleware: true,
      }),
    }),

    get_rejected: Duck.createAction(),
    get_resolved: Duck.createAction(),
    get: Duck.createAction({
      defaultMeta: ({ payload = {} }) => ({
        keyClear: 'clear',
        keyErrors: 'errors',
        keyPagination: 'pagination',
        keyProcessing: 'getting',
        keyProcessingDidFail: 'gettingDidFail',
        keyRecord: 'record',
        keySaveLocal: 'save_local',
        keyStatus: 'status',
        method: 'get',
        params: Map(),
        useDuckMiddleware: payload.id !== null,
      }),
      meta: ({ payload }) => payload,
      payload: () => undefined,
    }),

    options_rejected: Duck.createAction(),
    options_resolved: Duck.createAction(),
    options: Duck.createAction({
      defaultMeta: {
        method: 'options',
        params: Map(),
        useDuckMiddleware: true,
      },
      meta: ({ payload }) => payload,
      payload: () => undefined,
    }),

    save_local: Duck.createAction(),
    save_rejected: Duck.createAction(),
    save_resolved: Duck.createAction(),
    save: Duck.createAction({
      defaultMeta: ({ entity, payload }) => ({
        id: entity.getId(payload) || null,
        keyErrors: 'errors',
        keyProcessing: 'saving',
        keyProcessingDidFail: 'savingDidFail',
        method: entity.getId(payload) ? 'put' : 'post',
        params: Map(),
        useDuckMiddleware: true,
      }),
    }),
  };

  static getInitialState({ entity }) {
    const initialRecord = entity.dataToRecord({});

    return Map({
      detail: Map({ [NULL_ID]: initialRecord }),
      detail_dirty: Map({ [NULL_ID]: initialRecord }),
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

  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity.apiBase) throw new Error('entities-duck: "entity" option must have an "apiBase"');
      if (!/^\/.*\/$/.test(options.entity.apiBase)) throw new Error('entities-duck: "apiBase" of "entity" option must start with a "/" and end with a "/"');
    }
  }

  errors(state, options) {
    return state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name,
      options.id === undefined ? 'list_errors' : 'detail_errors',
      options.id === undefined ? getIdentifier(Object.assign({ method: 'get' }, options)) : getId(options),
    ]);
  }

  record(state, options = {}) {
    return state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name,
      `${options.id === undefined ? 'list' : 'detail'}${options.dirty ? '_dirty' : ''}`,
      options.id === undefined ? getIdentifier(Object.assign({ method: 'get' }, options)) : getId(options),
      ...(options.id === undefined && this.entity.paginated ? ['results'] : []),
    ]);
  }

  meta(state, options) {
    return state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name,
      'options',
      getIdentifier(Object.assign({ method: 'options' }, options)),
    ]);
  }

  pagination(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.entity.paginated) throw new Error(`entities-duck (paginated): paginated option must be set for entity "${this.entity.name}".`);
    }

    const recordsMap = state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name,
      'list',
      getIdentifier(Object.assign({ method: 'get' }, options)),
    ]);

    return recordsMap && recordsMap.remove('results');
  }

  status(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.status) throw new Error("entities-duck: 'status' property is required for status selector");
      if (!options.method) throw new Error("entities-duck: 'method' property is required for status selector");
    }

    return state.getIn(
      [
        this.app,
        this.constructor.namespace,
        this.entity.name,
        'status',
        options.status,
        getIdentifier(options),
      ],
      false,
    );
  }

  hasPermissions(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.permissions) {
        throw new Error('entities-duck: \'permissions\' property is required for permission selector');
      }

      if (!options.method) {
        throw new Error('entities-duck: \'method\' property is required for status selector');
      }
    }

    const permissions = state.getIn(
      [
        this.app,
        this.constructor.namespace,
        this.entity.name,
        'options',
        getIdentifier(options),
        'permissions',
      ],
      List(),
    );

    const requiredPermissions = Array.isArray(options.permissions)
      ? options.permissions
      : [options.permissions];

    return !!requiredPermissions.find(permission => permissions.includes(permission));
  }
}
