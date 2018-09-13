import axios from 'axios';
import { Map } from 'immutable';


import Duck from './duck';

export default class ScreenDuck extends Duck {
  static namespace = 'screens';

  static actions = {
    clear: Duck.createAction(),
    save: Duck.createAction(),
    get: dispatch => Duck.createAction({
      payload: axios.get()
        .then(result => dispatch()
      )
    })
    sav: Duck.createAction({
      payload: new Promise((resolve) = {
        
      })
    })
  };

  // TODO check for mode and pagination and any related key that is required
  static modes = {
    default: {
      clear: 'clear',
      save: 'save',
      record: 'record',
    },
  };

  static getInitialState({ entity }) {
    const defaultValue = entity.dataToRecord({});

    return Map({
      detail: defaultValue,
      detail_dirty: defaultValue,
    });
  }

  static getReducers(types, initialState) {
    return {
      [types.clear]: (state, action) => (
        action.meta.dirty
          ? state.set('detail_dirty', state.get('detail'))
          : initialState
      ),

      [types.save]: (state, action) => {
        if (process.env.NODE_ENV !== 'production') {
          if (Map.isMap(action ?.payload)) throw new Error('DuckScreen (save): payload must be an Immutable Map');
        }

        return state.withMutations(
          s => s
            .update('detail', detail => (action.meta.dirty ? detail : action.payload))
            .set('detail_dirty', action.payload),
        );
      },
    };
  }

  record(state, { dirty, id } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (id !== null) throw new Error('DuckScreen (record): only support id === null');
    }

    return state.getIn([
      this.app,
      this.constructor.namespace,
      this.entity.name, dirty ? 'detail_dirty' : 'detail',
    ]);
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
