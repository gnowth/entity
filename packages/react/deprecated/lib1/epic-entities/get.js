import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { stringify } from 'query-string';
import { ajax } from 'rxjs/observable/dom/ajax';

import settings from 'settings';

const getResolved = action => response => ({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_GET_RESOLVED`,
  payload: action.meta.entity.dataToRecord(response),
  meta: action.meta,
});

export default action$ => action$
  .filter(action => /^@@entities\/.*_GET$/.test(action.type))
  .mergeMap((action) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!action.meta.options.id) {
        throw new Error(`'id' option is required for 'get' action of type '${action.type}'`);
      }
    }

    const { id, params } = action.meta.options;

    return ajax
      .getJSON(`${settings.BASE_API_URL}${action.meta.entity.apiBase}/${id}/?${stringify(params)}`)
      .map(getResolved(action))
      .catch(error => Observable.of({
        type: `@@entities/${action.meta.entity.name.toUpperCase()}_GET_FAILED`,
        payload: error,
        meta: action.meta,
      }));
  });
