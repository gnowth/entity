import { combineReducers } from 'redux-immutable';
// import { routerReducer } from 'react-router-redux';

// import AuthenticationDuck from 'lib/duck-authentication';

const loadDuckReducerFromReq = (req, { namedExport, property } = {}) => {
  const storeList = req.keys().map((key) => {
    const duckContainer = namedExport ? req(key).Duck : req(key).default;
    const duck = property ? duckContainer && duckContainer[property] : duckContainer;

    return duck && ({ [duck.store]: duck.reducer });
  });

  return combineReducers({ ...Object.assign({}, ...storeList) });
};

const screenReq = require.context('components/screens', true, /duck\.js$/);
const entityReq = require.context('entities', true, /\.js$/);

export default combineReducers({
  // router: routerReducer,
  screens: loadDuckReducerFromReq(screenReq),
  entities: loadDuckReducerFromReq(entityReq, { namedExport: true }),
  // app: combineReducers({
  //   [AuthenticationDuck.store]: AuthenticationDuck.reducer,
  // }),
});
