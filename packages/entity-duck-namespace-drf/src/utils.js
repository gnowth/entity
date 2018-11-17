import _isString from 'lodash/isString';
import { fromJS, List, Map } from 'immutable';
import { stringify } from 'query-string';

export const NULL_ID = 'id_null';

export const getId = ({ id = '' } = {}) => (id === null ? NULL_ID : id);

export const getIdentifier = ({ id = '', tag = '', params = Map(), method = 'get', action = '' }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!Map.isMap(params)) throw new Error('getIdentifier: "params" options must be an immutable map');

    const invalidParams = params.filterNot((param = '') => _isString(param)).toKeyedSeq();
    if (invalidParams.size > 0) throw new Error(`getIdentifier (${invalidParams.join(', ')}): params must be a string or undefined`);
  }

  const paramsString = stringify(params.filter(p => p).toJS());

  const paramsFrag = paramsString && `.${paramsString}`;
  const actionFrag = action && `.${action}`;
  const tagFrag = tag && `.${tag}`;
  const idFrag = id === null ? `.${NULL_ID}` : `.${id}`;

  return `${method}${actionFrag}${tagFrag}${idFrag}${paramsFrag}`;
};

export const parseError = error => List([
  error.response.state === 0
    && 'Error 0: A fatal error occurred.',

  error.response.status === 401
    && `Error 401: ${error.response.data.detail || error.response.data}`,

  error.response.status === 403
    && `Error 403: ${error.response.data.detail || error.response.data}`,

  error.response.status === 404
    && 'Error 404: Not found.',

  error.response.status >= 500
    && error.response.status < 600
    && `Error ${error.response.status}: A server error occurred.`,

  error.response.status !== 401
    && error.response.status !== 403
    && error.response.data
    && fromJS({
      api: true,
      detail: true,
      message: 'Invalid Fields',
      errors: error.response.data,
    }),
]).filter(e => e);
