import idx from 'idx';
import DuckDjangoRestFramework from '@burnsred/entity-duck-namespace-drf';
import { List, Map } from 'immutable';

import Queries from './queries';
import Selectors from './selectors';

export default class Auth extends DuckDjangoRestFramework {
  static namespace = 'auth'

  static Queries = Queries;

  static Selectors = Selectors

  static getActions() {
    return {
      whoAmI: this.makeAction({
        defaultMeta: { id: null, method: 'get', sideEffect: true },
        hasPayload: false,
      }),
      whoAmI_rejected: this.makeAction(),
      whoAmI_resolved: this.makeAction(),
    };
  }

  static getInitialState() {
    return Map({
      detail: null,
      errors: List(),
      status: Map({
        authenticating: false,
        authenticatingDidFail: false,
        whoAmIed: false,
      }),
    });
  }

  static getReducers(types, initialState) {
    return {
      [types.whoAmI]: state => state.withMutations(
        s => s
          .setIn(['status', 'authenticating'], true)
          .setIn(['status', 'authenticatingDidFail'], false)
          .setIn(['status', 'whoAmIed'], true),
      ),

      [types.whoAmI_rejected]: (state, action) => (
        idx(action, x => x.payload.response.status) === 401
          ? initialState
          : state.withMutations(
            s => s
              .set('errors', action.duck.getErrors(action.payload))
              .setIn(['status', 'authenticating'], false)
              .setIn(['status', 'authenticatingDidFail'], true),
          )
      ),

      [types.whoAmI_resolved]: (state, action) => state.withMutations(
        s => s
          .set('detail', action.duck.entity.dataToRecord(action.payload))
          .set('errors', List())
          .setIn(['status', 'authenticating'], false),
      ),
    };
  }
}
