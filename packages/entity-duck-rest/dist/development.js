import { fromJS, List, Map as Map$1 } from 'immutable';
import { stringify } from 'query-string';
import { Duck } from '@gnowth/entity-duck';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

const getIdentifier = ({
  id = '',
  tag = '',
  params,
  method,
  action,
  useId
}) => {
  if (useId && id !== '') {
    return id === null ? 'id_null' : id;
  } // TODO add check for params


  const paramsString = stringify(params && params.filter(p => p).toJS());
  const paramsFrag = paramsString && `.${paramsString}`;
  const actionFrag = action ? `.${action}` : '';
  const tagFrag = tag ? `.${tag}` : '';
  const idFrag = id === null ? '.id_null' : `.${id}`;
  return `${method}${actionFrag}${tagFrag}${idFrag}${paramsFrag}`;
};
const parseError = error => {
  const obj = {
    status: error.response.status,
    nonFieldErrors: [],
    errors: {}
  };

  if (error.response.status === 0) {
    obj.nonFieldErrors = ['A fatal error occurred.'];
  } else if (error.response.status === 401 || error.response.status === 403) {
    obj.nonFieldErrors = [error.response.data.detail || error.response.data];
  } else if (error.response.status === 404) {
    obj.nonFieldErrors = ['Not found.'];
  } else if (error.response.status >= 500 && error.response.status < 600) {
    obj.nonFieldErrors = ['A server error occurred.'];
  } else if (error.response.data.non_field_errors) {
    obj.nonFieldErrors = error.response.data.non_field_errors;
  } else {
    obj.errors = error.response.data;
  }

  return fromJS(obj);
};

var reducerClear = ((types, initialState) => ({
  [types.clear]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return action.meta.dirty ? state.setIn(['detail_dirty', identifier], state.getIn(['detail', identifier])) : state.withMutations(s => s.setIn(['detail', identifier], initialState.getIn(['detail', identifier])).setIn(['detail_dirty', identifier], initialState.getIn(['detail', identifier])));
  }
}));

const getDataFactory = (payload, entity) => entity.dataToRecord(payload);

const listDataFactory = (payload, entity) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!entity.paginated && !Array.isArray(payload)) throw new Error(`entity-duck: list data received for entity "${entity.name}" is not an array. Could the endpoint be paginated?`);
    if (entity.paginated && Array.isArray(payload)) throw new Error(`entity-duck: list data received for entity "${entity.name}" is an array. Could the endpoint not be paginated?`);
  }

  return entity.paginated ? fromJS(_objectSpread({}, payload, {
    count: parseInt(payload.count, 10),
    results: payload.results.map(data => entity.dataToRecord(data))
  })) : payload.map(data => entity.dataToRecord(data));
}; // TODO remove list_dirty?


var reducerGet = (types => ({
  [types.get]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['errors', identifier], undefined).setIn(['status', 'getting', identifier], true).setIn(['status', 'gettingDidFail', identifier], false));
  },
  [types.get_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const dataFactory = action.meta.id ? getDataFactory : listDataFactory;
    return state.withMutations(s => s.updateIn(action.meta.id ? ['detail', action.meta.id] : ['list', identifier], result => action.meta.skipStore ? result : fromJS(dataFactory(action.payload, action.meta.entity))).updateIn(action.meta.id ? ['detail_dirty', action.meta.id] : ['list_dirty', identifier], result => action.meta.skipStore ? result : fromJS(dataFactory(action.payload, action.meta.entity))).setIn(['status', 'getting', identifier], false));
  },
  [types.get_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta); // TODO add option to flush on fail

    return state.withMutations(s => s.setIn(['errors', identifier], action.payload).setIn(['status', 'getting', identifier], false).setIn(['status', 'gettingDidFail', identifier], true));
  }
}));

var reducerOptions = (types => ({
  [types.options]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['status', 'optioning', identifier], true).setIn(['status', 'optioningDidFail', identifier], false));
  },
  [types.options_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['errors', identifier], null).setIn(['options', identifier], fromJS(action.payload)).setIn(['status', 'optioning', identifier], false));
  },
  [types.options_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['errors', identifier], parseError(action.payload)).setIn(['status', 'optioning', identifier], false).setIn(['status', 'optioningDidFail', identifier], true));
  }
}));

var reducerSave = ((types, initialState) => ({
  [types.save]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const idIdentifier = getIdentifier(_objectSpread({}, action.meta, {
      useId: true
    }));
    return state.withMutations(s => s.updateIn(['detail_dirty', idIdentifier], detail => action.meta.dirty ? action.payload : detail).setIn(['status', 'saving', identifier], true).setIn(['status', 'savingDidFail', identifier], false));
  },
  // TODO also set record for new uuid if id was null
  [types.save_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const idIdentifier = getIdentifier(_objectSpread({}, action.meta, {
      useId: true
    }));
    const record = action.meta.entity.dataToRecord(action.payload);
    console.log('idIdentifier', idIdentifier, action);
    return state.withMutations(s => s.updateIn(['detail', idIdentifier], detail => action.meta.skipStore ? detail : record).setIn(['detail_dirty', idIdentifier], action.meta.skipStore ? state.getIn(['detail', idIdentifier]) : record).setIn(['errors', identifier], null).setIn(['status', 'saving', identifier], false).update('list', list => action.meta.invalidateList ? initialState.get('list') : list).update('list_dirty', list => action.meta.invalidateList ? initialState.get('list_dirty') : list));
  },
  [types.save_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['errors', identifier], parseError(action.payload)).setIn(['status', 'saving', identifier], false).setIn(['status', 'savingDidFail', identifier], true));
  }
}));

var reducerDelete = ((types, initialState) => ({
  [types.delete]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['status', 'deleting', identifier], true).setIn(['status', 'deletingDidFail', identifier], false));
  },
  [types.delete_resolved]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    const idIdentifier = getIdentifier(_objectSpread({}, action.meta, {
      useId: true
    }));
    return state.withMutations(s => s.deleteIn(['detail', idIdentifier]).deleteIn(['detail_dirty', idIdentifier]).setIn(['errors', identifier], null).setIn(['status', 'deleting', identifier], false).update('list', list => action.meta.invalidateList ? initialState.get('list') : list).update('list_dirty', list => action.meta.invalidateList ? initialState.get('list_dirty') : list));
  },
  [types.delete_rejected]: (state, action) => {
    const identifier = getIdentifier(action.meta);
    return state.withMutations(s => s.setIn(['errors', identifier], parseError(action.payload)).setIn(['status', 'deleting', identifier], false).setIn(['status', 'deletingDidFail', identifier], true));
  }
}));

class EntityDuck extends Duck {
  static getInitialState({
    entity
  }) {
    const initialRecord = entity.dataToRecord({});
    return Map$1({
      detail: Map$1({
        [getIdentifier({
          id: null,
          useId: true
        })]: initialRecord
      }),
      detail_dirty: Map$1({
        [getIdentifier({
          id: null,
          useId: true
        })]: initialRecord
      }),
      errors: Map$1(),
      list: Map$1(),
      list_dirty: Map$1(),
      options: Map$1(),
      status: Map$1({
        deleting: Map$1(),
        deletingDidFail: Map$1(),
        getting: Map$1(),
        gettingDidFail: Map$1(),
        optioning: Map$1(),
        optioningDidFail: Map$1(),
        saving: Map$1(),
        savingDidFail: Map$1()
      })
    });
  }

  static getReducers(types, initialState) {
    return _objectSpread({}, reducerClear(types, initialState), reducerGet(types, initialState), reducerOptions(types, initialState), reducerSave(types, initialState), reducerDelete(types, initialState));
  }

  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity.apiBase) throw new Error('entities-duck: "entity" option must have an "apiBase"');
      if (!/^\/.*\/$/.test(options.entity.apiBase)) throw new Error('entities-duck: "apiBase" of "entity" option must start with a "/" and end with a "/"');
    }
  }

  errors(state, options) {
    return state.getIn([this.app, this.constructor.namespace, this.entity.name, 'errors', getIdentifier(options)]);
  } // TODO check if result is a list if not paginated


  record(state, options = {}) {
    return state.getIn([this.app, this.constructor.namespace, this.entity.name, `${options.id === undefined ? 'list' : 'detail'}${options.dirty ? '_dirty' : ''}`, getIdentifier(Object.assign({
      method: 'get',
      useId: true
    }, options)), ...(options.id === undefined && this.entity.paginated ? ['results'] : [])]);
  } // records(state, options) {
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
    return state.getIn([this.app, this.constructor.namespace, this.entity.name, 'options', getIdentifier(Object.assign({
      method: 'options'
    }, options))]);
  }

  pagination(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.entity.paginated) throw new Error(`entities-duck (paginated): paginated option must be set for entity "${this.entity.name}".`);
    }

    const recordsMap = state.getIn([this.app, this.constructor.namespace, this.entity.name, 'list', getIdentifier(Object.assign({
      method: 'get'
    }, options))]);
    return recordsMap && recordsMap.remove('results');
  }

  status(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.status) throw new Error("entities-duck: 'status' property is required for status selector");
      if (!options.method) throw new Error("entities-duck: 'method' property is required for status selector");
    }

    return state.getIn([this.app, this.constructor.namespace, this.entity.name, 'status', options.status, getIdentifier(options)], false);
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

    const permissions = state.getIn([this.app, this.constructor.namespace, this.entity.name, 'options', getIdentifier(options), 'permissions'], List());
    const requiredPermissions = Array.isArray(options.permissions) ? options.permissions : [options.permissions];
    return !!requiredPermissions.find(permission => permissions.includes(permission));
  }

}

_defineProperty(EntityDuck, "namespace", 'entities');

_defineProperty(EntityDuck, "actions", {
  clear: Duck.createAction(),
  delete_rejected: Duck.createAction(),
  delete_resolved: Duck.createAction(),
  delete: Duck.createAction({
    defaultMeta: ({
      entity,
      payload
    }) => ({
      id: entity.getId(payload),
      keyProcessing: 'deleting',
      keyProcessingDidFail: 'deletingDidFail',
      method: 'delete',
      params: Map$1(),
      useEntityMiddleware: true
    })
  }),
  get_rejected: Duck.createAction(),
  get_resolved: Duck.createAction(),
  get: Duck.createAction({
    defaultMeta: ({
      payload
    }) => ({
      keyClear: 'clear',
      keyPagination: 'pagination',
      keyProcessing: 'getting',
      keyProcessingDidFail: 'gettingDidFail',
      keyRecord: 'record',
      keySave: 'save',
      keyStatus: 'status',
      method: 'get',
      params: Map$1(),
      useEntityMiddleware: payload.id !== null
    }),
    meta: ({
      payload
    }) => payload,
    payload: () => undefined
  }),
  options_rejected: Duck.createAction(),
  options_resolved: Duck.createAction(),
  options: Duck.createAction({
    defaultMeta: {
      method: 'options',
      params: Map$1(),
      useEntityMiddleware: true
    },
    meta: ({
      payload
    }) => payload,
    payload: () => undefined
  }),
  // TODO it does not allow creating multiple new
  save_rejected: Duck.createAction(),
  save_resolved: Duck.createAction(),
  save: Duck.createAction({
    defaultMeta: ({
      entity,
      payload,
      options = {}
    }) => ({
      id: entity.getId(payload) || null,
      // TODO rethink. starting to get too hacky
      keyProcessing: 'saving',
      keyProcessingDidFail: 'savingDidFail',
      method: entity.getId(payload) ? 'put' : 'post',
      params: Map$1(),
      useEntityMiddleware: !options.dirty
    })
  })
});

export default EntityDuck;
//# sourceMappingURL=development.js.map
