import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { stringify } from 'query-string';
import { ajax } from 'rxjs/observable/dom/ajax';
import { List } from 'immutable';

import settings from 'settings';

const listResolved = action => response => ({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_LIST_RESOLVED`,
  payload: List(response.map(item => action.meta.entity.dataToRecord(item))),
  meta: action.meta,
});

export default action$ => action$
  .filter(action => /^@@entities\/.*_LIST$/.test(action.type))
  .mergeMap(
    action => ajax
      .getJSON(`${settings.BASE_API_URL}${action.meta.entity.apiBase}/?${stringify(action.meta.options.params)}`)
      .map(listResolved(action)),
  );
 