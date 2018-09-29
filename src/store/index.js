import axios from 'axios';
import { duckMiddleware } from '@entity/duck';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { Map } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';

import rootReducer from 'store/reducers';

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

export const history = createBrowserHistory();

export default createStore(
  connectRouter(history)(combineReducers(rootReducer)),
  Map(),
  composeEnhancers(
    applyMiddleware(
      duckMiddleware(axios),
      routerMiddleware(history),
    ),
  ),
);
