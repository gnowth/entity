// @flow

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import axios from 'axios';
import { stringify } from 'query-string';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import settings from 'settings';

import type { Observable } from 'rxjs';
import type { Action } from 'lib/duck-entity/type';
import type { EpicEntityOptions } from './index';

const query = (action) => {
  const { id, params } = action.meta.options;
  const paramsString = params ? `?${stringify(params)}` : '';

  return axios.get(`${settings.BASE_API_URL}${action.meta.entity.apiBase}/${id}/${paramsString}`);
};

const resolvedObservable = action => response => ({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_GET_RESOLVED`,
  payload: action.meta.entity.dataToRecord(response),
  meta: action.meta,
});

const failedObservable = (action, parser) => error => of({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_GET_FAILED`,
  payload: parser(error),
  meta: action.meta,
});

export default (options: EpicEntityOptions) => (action$: Observable<Action>) => action$
  .filter(action => /^@@entities\/.*_GET$/.test(action.type))
  .mergeMap((action) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!action.meta.options.id) {
        throw new Error(`'id' option is required for 'get' action of type '${action.type}'`);
      }
    }

    return fromPromise(query(action))
      .map(resolvedObservable(action))
      .catch(failedObservable(action, options.parser));
  });
