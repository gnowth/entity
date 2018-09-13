import { Map } from 'immutable';

import { Duck, createAction } from 'lib/redux-duck';
import { callIfFunction } from 'lib/context-methods';

const namespace = 'screens';

export default ({ store, initialState = Map() }) => new Duck({
  store,
  namespace,
  initialState,

  actions: {
    setState: createAction(),
  },

  reducers: ({ types }) => ({
    [types.setState]: (state, action) => {
      const newData = action.payload::callIfFunction(state);

      return state.merge(
        Map.isMap(newData) ? newData : Map(newData),
      );
    },
  }),

  selectors: {
    state: state => state.getIn([namespace, store]),
  },
});
