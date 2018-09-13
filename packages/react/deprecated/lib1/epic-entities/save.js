import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ajax } from 'rxjs/observable/dom/ajax';
import { fromJS } from 'immutable';

import settings from 'settings';

const saveResolved = action => response => ({
  type: `@@entities/${action.meta.entity.name.toUpperCase()}_SAVE_RESOLVED`,
  payload: fromJS(response),
  meta: action.meta,
});

export default action$ => action$
  .filter(action => /^@@entities\/.*_SAVE$/.test(action.type))
  .mergeMap((action) => {
    const { idField } = action.meta.entity;
    const id = action.payload.get(idField);
    const idString = id ? `${id}/` : '';

    return ajax({
      url: `${settings.BASE_API_URL}${action.meta.entity.apiBase}/${idString}`,
      method: id ? 'PUT' : 'POST',
      body: action.payload.toJS(),
    })
      .map(saveResolved(action));
  });
