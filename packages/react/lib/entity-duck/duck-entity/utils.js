import { fromJS } from 'immutable';
import { stringify } from 'query-string';

export const getIdentifier = ({ id = '', tag = '', params, method, action }) => {
  const paramsString = stringify(params && params.filter(p => p).toJS());

  const paramsFrag = paramsString && `.${paramsString}`;
  const actionFrag = action ? `.${action}` : '';
  const tagFrag = tag ? `.${tag}` : '';
  const idFrag = id && `.${id}`;

  return `${method}${actionFrag}${tagFrag}${idFrag}${paramsFrag}`;
};

export const parseError = (error) => {
  const obj = {
    status: error.response.status,
    nonFieldErrors: [],
    errors: {},
  };

  if (error.response.status === 0) {
    obj.nonFieldErrors = ['A fatal error occurred.'];
  } else if (error.response.status === 401 || error.response.status === 403) {
    obj.nonFieldErrors = [error.response.data.detail || error.response.data];
  } else if (error.response.status === 404) {
    obj.nonFieldErrors = ['Not found.'];
  } else if (error.response.status >= 500 && error.response.status < 600) {
    obj.nonFieldErrors = ['A server error occurred.'];
  } else if (error.response.data.non_field_errors) {
    obj.nonFieldErrors = error.response.data.non_field_errors;
  } else {
    obj.errors = error.response.data;
  }

  return fromJS(obj);
};
