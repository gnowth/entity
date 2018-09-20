import _compose from 'lodash/fp/compose';
import _filter from 'lodash/fp/filter';
import _flatMap from 'lodash/fp/flatMap';
import _groupBy from 'lodash/fp/groupBy';
import _mapValues from 'lodash/fp/mapValues';
import { combineReducers } from 'redux-immutable';
import { Duck } from '@gnowth/entity-duck';

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

// import _compose from 'lodash/fp/compose';
// import _groupBy from 'lodash/fp/groupBy';
// import _mapValues from 'lodash/fp/mapValues';
// import _flatMap from 'lodash/fp/flatMap';
// import _filter from 'lodash/fp/filter';
// import { combineReducers } from 'redux-immutable';

// import { Duck } from 'lib/entity-duck';

// const createReducersFromDucks = _compose(
//   combineReducers,
//   _mapValues(duck => duck[0].createReducer()),
//   _groupBy(duck => duck.entity.name),
// );

// const createAppReducersFromDucks = _compose(
//   combineReducers,
//   _mapValues(createReducersFromDucks),
//   _groupBy(duck => duck.constructor.namespace),
// );

// const reqs = [
//   require.context('screens/App', true, /entity\.js$/), // ScreenReq
//   require.context('screens/App/Action/entities', true, /\.js$/), // EntityReq
//   require.context('screens/App/Filer/entities', true, /\.js$/), // EntityReq
//   require.context('screens/App/People/entities', true, /\.js$/), // EntityReq
//   require.context('screens/App/TZ/entities', true, /\.js$/), // EntityReq
//   require.context('screens/App/WI/entities', true, /\.js$/), // EntityReq
// ];

// export default _compose(
//   _mapValues(createAppReducersFromDucks),
//   _groupBy(duck => duck.app),
//   _filter(duck => duck instanceof Duck),
//   _flatMap(req => req.keys().map(key => req(key).default && req(key).default.duck)),
// )(reqs);


// import { combineReducers } from 'redux-immutable';
// // import { routerReducer } from 'react-router-redux';

// // import AuthenticationDuck from 'lib/duck-authentication';

// const loadDuckReducerFromReq = (req, { namedExport, property } = {}) => {
//   const storeList = req.keys().map((key) => {
//     const duckContainer = namedExport ? req(key).Duck : req(key).default;
//     const duck = property ? duckContainer && duckContainer[property] : duckContainer;

//     return duck && ({ [duck.store]: duck.reducer });
//   });

//   return combineReducers({ ...Object.assign({}, ...storeList) });
// };

// const screenReq = require.context('components/screens', true, /duck\.js$/);
// const entityReq = require.context('entities', true, /\.js$/);

// export default combineReducers({
//   // router: routerReducer,
//   screens: loadDuckReducerFromReq(screenReq),
//   entities: loadDuckReducerFromReq(entityReq, { namedExport: true }),
//   // app: combineReducers({
//   //   [AuthenticationDuck.store]: AuthenticationDuck.reducer,
//   // }),
// });
