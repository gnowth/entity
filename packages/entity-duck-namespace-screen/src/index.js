import { Entity } from '@burnsred/entity';
import Duck from '@burnsred/entity-duck';
import { Map } from 'immutable';

import Queries from './queries';
import Selectors from './selectors';

export default class Screen extends Duck {
  static namespace = 'screens';

  static Queries = Queries

  static Selectors = Selectors

  static getActions() {
    return {
      clear: this.makeAction({ hasPayload: false }),
      get: this.makeAction({
        hasPayload: false,
        defaultMeta: { id: null },
      }),
      save: this.makeAction(),
      save_local: this.makeAction(),
    };
  }

  static getInitialState(configs = {}) {
    const defaultValue = configs.entity && configs.entity.dataToRecord({});

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
          if (!Map.isMap(action.payload)) throw new Error(`ScreenDuck.save_local (${this.entity.name}): payload must be an Immutable Map`);
        }

        return state.set('detail_dirty', action.payload);
      },

      [types.save]: (state, action) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!Map.isMap(action.payload)) throw new Error(`ScreenDuck.save (${this.entity.name}): payload must be an Immutable Map`);
        }

        return state.withMutations(
          s => s
            .set('detail', action.payload)
            .set('detail_dirty', action.payload),
        );
      },
    };
  }

  constructor(configs = {}) {
    super(configs);

    if (process.env.NODE_ENV !== 'production') {
      if (!configs.entity || !Entity.isEntity(configs.entity)) throw new Error(`${this.constructor.name}.constructor: "entity" option must be child of "Entity"`);
    }
  }
}
