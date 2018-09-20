import { Duck } from '@gnowth/entity-duck';
import { Map as Map$1 } from 'immutable';

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

class ScreenDuck extends Duck {
  static getInitialState({
    entity
  }) {
    const defaultValue = entity.dataToRecord({});
    return Map$1({
      detail: defaultValue,
      detail_dirty: defaultValue
    });
  }

  static getReducers(types, initialState) {
    return {
      [types.clear]: (state, action) => action.meta.dirty ? state.set('detail_dirty', state.get('detail')) : initialState,
      [types.save]: (state, action) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!Map$1.isMap(action === null || action === void 0 ? void 0 : action.payload)) throw new Error('DuckScreen (save): payload must be an Immutable Map');
        }

        return state.withMutations(s => s.update('detail', detail => action.meta.dirty ? detail : action.payload).set('detail_dirty', action.payload));
      }
    };
  }

  record(state, {
    dirty,
    id
  } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (id !== null) throw new Error('DuckScreen (record): only support id === null');
    }

    return state.getIn([this.app, this.constructor.namespace, this.entity.name, dirty ? 'detail_dirty' : 'detail']);
  }

}
/**
 * ability to create local
 * id === null for create local ?
 *
 * get action/selectors based on props in queryDuck?
 * errors from entity
 *
 * action to return promise?
 */

_defineProperty(ScreenDuck, "namespace", 'screens');

_defineProperty(ScreenDuck, "actions", {
  clear: Duck.createAction(),
  get: Duck.createAction({
    defaultMeta: {
      id: null,
      keyClear: 'clear',
      keyRecord: 'record',
      keySave: 'save',
      params: Map$1()
    }
  }),
  save: Duck.createAction()
});

export default ScreenDuck;
//# sourceMappingURL=development.js.map
