import _endsWith from 'lodash/endsWith';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

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

export default axios => store => next => (action) => {
  const shouldSkipMiddleware = !action.meta?.useDuckMiddleware
    || _endsWith(action.type, '_RESOLVED')
    || _endsWith(action.type, '_REJECTED')
    || !(action.meta?.entity?.duck instanceof Duck);

  if (shouldSkipMiddleware) {
    return next(action);
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!Map.isMap(action.meta.params)) throw new Error('DuckMiddleware.action.meta: "params" options must be an immutable map');

    const invalidParams = action.meta.params.filterNot((param = '') => _isString(param)).toKeyedSeq();
    if (invalidParams.size > 0) throw new Error(`DuckMiddleware.action.meta (${invalidParams.join(', ')}): params must be a string or undefined`);
  }

  const customAction = action.meta.action ? `${action.meta.action}/` : '';

  const args = [
    action.meta.id
      ? `${action.meta.entity.paths?.apiBase}${action.meta.id}/${customAction}`
      : `${action.meta.entity.paths?.apiBase}${customAction}`,
    ...(action.payload ? [action.meta.entity.toData(action.payload)] : []),
    {
      params: action.meta.params
        && action.meta.params.filter(p => p).toJS(),
    },
  ];

  const promise = axios[action.meta.method]
    .apply(null, args)
    .then(handleResponse(action, store.dispatch))
    .catch(handleError(action, store.dispatch));

  return next({ ...action, promise });
};
