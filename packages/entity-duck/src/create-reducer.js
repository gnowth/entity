import _ from 'lodash';
import idx from 'idx';

import Duck from './duck';

const makeReducer = (ducks) => {
  if (process.env.NODE_ENV !== 'production') {
    if (ducks.length > 1) throw new Error(`@burnsred/entity-duck createDuckReducerFromRequires [app: ${ducks[0].app}, namespace: ${ducks[0].namespace}, name: ${ducks[0].name}]: can only have 1 duck for (app|namespace|name) combination`);
  }

  return ducks[0].reducer;
};

const makeReducersFromDucks = combineReducers => _.flowRight([
  combineReducers,
  ducks => _.mapValues(ducks, makeReducer),
  ducks => _.groupBy(ducks, duck => duck.name),
]);

const makeAppReducersFromDucks = combineReducers => _.flowRight([
  combineReducers,
  ducks => _.mapValues(ducks, makeReducersFromDucks(combineReducers)),
  ducks => _.groupBy(ducks, duck => duck.namespace),
]);

export default (reqs, combineReducers) => _.flowRight([
  ducks => _.mapValues(ducks, makeAppReducersFromDucks(combineReducers)),
  ducks => _.groupBy(ducks, duck => duck.app),
  ducks => _.filter(ducks, duck => duck instanceof Duck),
  requests => _.flatMap(
    _.flatten(requests),
    req => req.duck || (
      req.keys && req.keys().map(
        key => idx(req(key), x => x.default.duck),
      )
    ),
  ),
])(reqs);
