import { fromJS, List } from 'immutable';
import { stringify } from 'query-string';

export const NULL_ID = 'id_null';

export const getId = ({ id = '' }) => (id === null ? NULL_ID : id);

export const getIdentifier = ({ id = '', tag = '', params, method, action }) => {
  // TODO add check for params
  const paramsString = stringify(params && params.filter(p => p).toJS());

  const paramsFrag = paramsString && `.${paramsString}`;
  const actionFrag = action ? `.${action}` : '';
  const tagFrag = tag ? `.${tag}` : '';
  const idFrag = id === null ? `.${NULL_ID}` : `.${id}`;

  return `${method}${actionFrag}${tagFrag}${idFrag}${paramsFrag}`;
};

// TODO response can be undefined?
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
      message: 'Invalid Fields', // TODO check when implementing intl
      errors: error.response.data,
    }),
]).filter(e => e);
