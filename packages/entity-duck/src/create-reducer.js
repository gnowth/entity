import _flowRight from 'lodash/flowRight';
import _filter from 'lodash/filter';
import _flatMap from 'lodash/flatMap';
import _groupBy from 'lodash/groupBy';
import _mapValues from 'lodash/mapValues';

import Duck from './duck';

const makeReducer = (ducks) => {
  if (process.env.NODE_ENV !== 'production') {
    if (ducks.length > 1) throw new Error(`@entity/duck createDuckReducerFromRequires [app: ${ducks[0].app}, namespace: ${ducks[0].namespace}, name: ${ducks[0].name}]: can only have 1 duck for (app|namespace|name) combination`);
  }

  return ducks[0].reducer;
};

const makeReducersFromDucks = combineReducers => _flowRight(
  combineReducers,
  ducks => _mapValues(ducks, makeReducer),
  ducks => _groupBy(ducks, duck => duck.name),
);

const makeAppReducersFromDucks = combineReducers => _flowRight(
  combineReducers,
  ducks => _mapValues(ducks, makeReducersFromDucks(combineReducers)),
  ducks => _groupBy(ducks, duck => duck.namespace),
);

export default (reqs, combineReducers) => _flowRight(
  ducks => _mapValues(ducks, makeAppReducersFromDucks(combineReducers)),
  ducks => _groupBy(ducks, duck => duck.app),
  ducks => _filter(ducks, duck => duck instanceof Duck),
  requests => _flatMap(requests, req => req.keys().map(key => req(key).default?.duck)),
)(reqs);
