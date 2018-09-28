import _endsWith from 'lodash/fp/endsWith';
import _isFunction from 'lodash/isFunction';
import axios from 'axios';

import Duck from './duck';

const handleResponse = (action, dispatch) => (response) => {
  dispatch(action.meta.entity.duck[`${action.meta.keyAction}_resolved`](
    response.data,
    Object.assign({ payload: action.payload }, action.meta),
  ));

  if (_isFunction(action.meta.then)) {
    action.meta.then({ ...action, response });
  }
};

const handleError = (action, dispatch) => (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); // eslint-disable-line no-console
  }

  dispatch(action.meta.entity.duck[`${action.meta.keyAction}_rejected`](
    error,
    Object.assign({ payload: action.payload }, action.meta),
  ));

  if (_isFunction(action.meta.catch)) {
    action.meta.catch({ ...action, error });
  }
};

export default store => next => (action) => {
  const shouldSkipMiddleware = !action.meta?.useEntityMiddleware
    || _endsWith('_RESOLVED')(action.type)
    || _endsWith('_REJECTED')(action.type)
    || !(action.meta?.entity?.duck instanceof Duck);

  if (shouldSkipMiddleware) {
    return next(action);
  }

  const customAction = action.meta.action ? `${action.meta.action}/` : '';

  const args = [
    action.meta.id
      ? `${action.meta.entity.apiBase}${action.meta.id}/${customAction}`
      : `${action.meta.entity.apiBase}${customAction}`,
    ...(action.payload ? [action.meta.entity.recordToData(action.payload)] : []),
    {
      params: action.meta.params
        && action.meta.params.filter(p => p).toJS(), // TODO check that it is a string
    },
  ];

  axios[action.meta.method]
    .apply(null, args)
    .then(handleResponse(action, store.dispatch))
    .catch(handleError(action, store.dispatch));

  return next(action);
};
