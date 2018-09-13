import { createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { Map } from 'immutable';
// import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'store/reducers';
import rootEpic from 'store/epics';

const composeEnhancers = (() => {
  const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (() => undefined);
  const devCompose = process.env.NODE_ENV === 'development'
    && reduxCompose({
      /**
       * Specify extension’s options
       * [https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm]
       */
    });

  return devCompose || compose;
})();

export const history = createBrowserHistory();

export default createStore(
  // rootReducer,
  connectRouter(history)(rootReducer),
  Map(),
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(rootEpic),
      routerMiddleware(history),
    ),
  ),
);
