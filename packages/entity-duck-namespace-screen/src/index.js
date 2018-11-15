import { Duck } from '@entity/duck';
import { Map } from 'immutable';

export default class ScreenDuck extends Duck {
  static namespace = 'screens';

  static actions = {
    clear: Duck.createAction(),
    get: Duck.createAction({
      defaultMeta: {
        id: null,
        keyClear: 'clear',
        keyRecord: 'record',
        keySaveLocal: 'save_local',
        params: Map(),
      },
    }),
    save_local: Duck.createAction(),
    save: Duck.createAction(),
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

      [types.save_local]: (state, action) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!Map.isMap(action?.payload)) throw new Error('DuckScreen (save): payload must be an Immutable Map');
        }

        return state.set('detail_dirty', action.payload);
      },

      [types.save]: (state, action) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!Map.isMap(action?.payload)) throw new Error('DuckScreen (save): payload must be an Immutable Map');
        }

        return state.withMutations(
          s => s
            .set('detail', action.payload)
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
