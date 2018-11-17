import _flowRight from 'lodash/flowRight';
import _filter from 'lodash/filter';
import _flatMap from 'lodash/flatMap';
import _groupBy from 'lodash/groupBy';
import _mapValues from 'lodash/mapValues';

import Duck from './duck';

const createReducersFromDucks = combineReducers => _flowRight(
  combineReducers,
  ducks => _mapValues(ducks, duck => duck[0].createReducer()),
  ducks => _groupBy(ducks, duck => duck.entity.name),
);

const createAppReducersFromDucks = combineReducers => _flowRight(
  combineReducers,
  ducks => _mapValues(ducks, createReducersFromDucks(combineReducers)),
  ducks => _groupBy(ducks, duck => duck.constructor.namespace),
);

export default (reqs, combineReducers) => _flowRight(
  ducks => _mapValues(ducks, createAppReducersFromDucks(combineReducers)),
  ducks => _groupBy(ducks, duck => duck.app),
  ducks => _filter(ducks, duck => duck instanceof Duck),
  requests => _flatMap(requests, req => req.keys().map(key => req(key).default?.duck)),
)(reqs);
