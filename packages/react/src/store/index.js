import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { Map } from 'immutable';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from 'store/reducers';
import rootEpic from 'store/epics';
import { middleware as duckMiddleware } from '@gnowth/entity-duck';

const composeEnhancers = (
  process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    /**
     * Specify extension’s options
     * [https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm]
     */
  })
) || compose;

const epicMiddleware = createEpicMiddleware();

export const history = createBrowserHistory();

export default createStore(
  connectRouter(history)(combineReducers(rootReducer)),
  Map(),
  composeEnhancers(
    applyMiddleware(
      duckMiddleware,
      epicMiddleware,
      routerMiddleware(history),
    ),
  ),
);

epicMiddleware.run(rootEpic);
