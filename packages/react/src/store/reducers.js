import _compose from 'lodash/fp/compose';
import _filter from 'lodash/fp/filter';
import _flatMap from 'lodash/fp/flatMap';
import _groupBy from 'lodash/fp/groupBy';
import _mapValues from 'lodash/fp/mapValues';
import { Duck } from '@gnowth/entity-duck';
import { combineReducers } from 'redux-immutable';

const reqs = [
  require.context('apps', true, /\.\/[^/]*\/entities\/[^/]*\.js$/),
];

const createReducersFromDucks = _compose(
  combineReducers,
  _mapValues(duck => duck[0].createReducer()),
  _groupBy(duck => duck.entity.name),
);

const createAppReducersFromDucks = _compose(
  combineReducers,
  _mapValues(createReducersFromDucks),
  _groupBy(duck => duck.constructor.namespace),
);

export default _compose(
  _mapValues(createAppReducersFromDucks),
  _groupBy(duck => duck.app),
  _filter(duck => duck instanceof Duck),
  _flatMap(req => req.keys().map(key => req(key).default?.duck)),
)(reqs);
