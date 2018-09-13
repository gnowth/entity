import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ajax } from 'rxjs/observable/dom/ajax';
import { fromJS } from 'immutable';

import settings from 'settings';

const optionsResolved = action => response => ({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_OPTIONS_RESOLVED`,
  payload: fromJS(response.response),
  meta: action.meta,
});

export default action$ => action$
  .filter(action => /^@@entities\/.*_OPTIONS$/.test(action.type))
  .mergeMap((action) => {
    const { id } = action.meta.options;
    const idString = id ? `${id}/` : '';

    return ajax({
      url: `${settings.BASE_API_URL}${action.meta.entity.apiBase}/${idString}`,
      method: 'OPTIONS',
    })
      .map(optionsResolved(action));
  });

