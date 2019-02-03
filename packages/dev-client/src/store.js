import { createDuckReducerFromRequires, duckMiddleware } from '@entity/duck';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { Map } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';

const reqs = [
  require.context('apps', true, /\.\/[^/]*\/entities\/[^/]*\.js$/),
];

const rootReducerMap = createDuckReducerFromRequires(reqs, combineReducers);

const composeEnhancers = (
  process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
    /**
     * Specify extension’s options
     * [https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm]
     */
  })
) || compose;

export const history = createBrowserHistory();

export default createStore(
  combineReducers({
    router: connectRouter(history),
    ...rootReducerMap,
  }),
  Map(),
  composeEnhancers(
    applyMiddleware(
      duckMiddleware,
      routerMiddleware(history),
    ),
  ),
);
