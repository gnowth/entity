import _compose from 'lodash/fp/compose';
import _filter from 'lodash/fp/filter';
import _flatMap from 'lodash/fp/flatMap';
import _groupBy from 'lodash/fp/groupBy';
import _mapValues from 'lodash/fp/mapValues';

import Duck from './duck';

const createReducersFromDucks = combineReducers => _compose(
  combineReducers,
  _mapValues(duck => duck[0].createReducer()),
  _groupBy(duck => duck.entity.name),
);

const createAppReducersFromDucks = combineReducers => _compose(
  combineReducers,
  _mapValues(createReducersFromDucks(combineReducers)),
  _groupBy(duck => duck.constructor.namespace),
);

export default (reqs, combineReducers) => _compose(
  _mapValues(createAppReducersFromDucks(combineReducers)),
  _groupBy(duck => duck.app),
  _filter(duck => duck instanceof Duck),
  _flatMap(req => req.keys().map(key => req(key).default?.duck)),
)(reqs);
