import { List, Map } from 'immutable';

import { Duck } from 'lib/entity-duck';

import reducerClear from './reducer-clear';
import reducerGet from './reducer-get';
import reducerOptions from './reducer-options';
import reducerSave from './reducer-save';
import reducerDelete from './reducer-delete';
import { getIdentifier } from './utils';

export default class EntityDuck extends Duck {
  static namespace = 'entities';

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
        useEntityMiddleware: true,
      }),
    }),

    get_rejected: Duck.createAction(),
    get_resolved: Duck.createAction(),
    get: Duck.createAction({
      defaultMeta: ({ payload }) => ({
        keyClear: 'clear',
        keyPagination: 'pagination',
        keyProcessing: 'getting',
        keyProcessingDidFail: 'gettingDidFail',
        keyRecord: 'record',
        keySave: 'save',
        keyStatus: 'status',
        method: 'get',
        params: Map(),
        useEntityMiddleware: payload.id !== null,
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
        useEntityMiddleware: true,
      },
      meta: ({ payload }) => payload,
      payload: () => undefined,
    }),

    // TODO it does not allow creating multiple new
    save_rejected: Duck.createAction(),
    save_resolved: Duck.createAction(),
    save: Duck.createAction({
      defaultMeta: ({ entity, payload, options = {} }) => ({
        id: entity.getId(payload) || null, // TODO rethink. starting to get too hacky
        keyProcessing: 'saving',
        keyProcessingDidFail: 'savingDidFail',
        method: entity.getId(payload) ? 'put' : 'post',
        params: Map(),
        useEntityMiddleware: !options.dirty,
      }),
    }),
  };

  static getInitialState({ entity }) {
    const initialRecord = entity.dataToRecord({});

    return Map({
      detail: Map({ [getIdentifier({ id: null, useId: true })]: initialRecord }),
      detail_dirty: Map({ [getIdentifier({ id: null, useId: true })]: initialRecord }),
      errors: Map(),
      list: Map(),
      list_dirty: Map(),
      options: Map(),
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
      'errors',
      getIdentifier(options),
    ]);
  }

  // TODO check if result is a list if not paginated
  record(state, options = {}) {
    return state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name,
      `${options.id === undefined ? 'list' : 'detail'}${options.dirty ? '_dirty' : ''}`,
      getIdentifier(Object.assign({ method: 'get', useId: true }, options)),
      ...(options.id === undefined && this.entity.paginated ? ['results'] : []),
    ]);
  }

  // records(state, options) {
  //   if (process.env.NODE_ENV !== 'production') {
  //     if (!this.entity.paginated) {
  //       const results = state.getIn([
  //         this.app,
  //         this.constructor.namespace,
  //         this.entity.name,
  //         'list',
  //         getIdentifier(Object.assign({ method: 'get' }, options)),
  //         ...(this.entity.paginated ? ['results'] : []),
  //       ]);

  //       if (results && !List.isList(results)) {
  //         throw new Error(`entities-duck: records for entity "${this.entity.name}" must be a List. Did you forget to set "paginated" static field to "true" in the entity`);
  //       }
  //     }
  //   }

  //   return state.getIn([
  //     this.app,
  //     this.constructor.namespace,
  //     this.entity.name,
  //     'list',
  //     getIdentifier(Object.assign({ method: 'get' }, options)),
  //     ...(this.entity.paginated ? ['results'] : []),
  //   ]);
  // }

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
