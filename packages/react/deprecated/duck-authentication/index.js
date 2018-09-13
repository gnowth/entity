import { Map } from 'immutable';

import { Duck, createAction } from 'lib/redux-duck';

const namespace = 'app';
const store = 'authentication';

export default new Duck({
  store,
  namespace,

  initialState: Map({
    user: null,
    errors: Map(),
    status: Map({
      isWhoAmI: false,
      isAuthenticated: false,
    }),
  }),

  actions: {
    whoAmI: createAction(),
    whoAmI_failed: createAction(),
    whoAmI_resolved: createAction(),
    login: createAction(),
    login_failed: createAction(),
    login_resolved: createAction(),
    logout: createAction(),
    logout_failed: createAction(),
    logout_resolved: createAction(),
  },

  reducers: ({ types }) => ({
    [types.whoAmI]: state => state.withMutations(
      s => s
        .setIn(['status', 'isAuthenticated'], false)
        .setIn(['status', 'isWhoAmI'], true)
        .set('user', null),
    ),

    [types.whoAmI_resolved]: (state, action) => state.withMutations(
      s => s
        .setIn(['status', 'isAuthenticated'], action.payload.status === 200)
        .setIn(['status', 'isWhoAmI'], false)
        .set('user', action.payload),
    ),

    [types.whoAmI_failed]: state => state.withMutations(
      s => s.setIn(['status', 'isWhoAmI'], false),
    ),
  }),

  selectors: {
    currentUser: state => state.getIn([namespace, store, 'user']),
    isAuthenticated: state => state.getIn([namespace, store, 'status', 'isAuthenticated']),
    isWhoAmI: state => state.getIn([namespace, store, 'status', 'isWhoAmI']),
  },
});
