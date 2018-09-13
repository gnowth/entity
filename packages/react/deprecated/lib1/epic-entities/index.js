import { combineEpics } from 'redux-observable';

import get from './get';
import list from './list';
import save from './save';
import options from './options';

export default combineEpics(
  get,
  list,
  save,
  options,
);

// .mergeMap(action => ajax({
//   url: `${settings.BASE_API_URL}${action.meta.entity.apiBase}/`,
//   responseType: 'json',
//   crossDomain: true,
//   headers: {
//     xsrfHeaderName: 'X-CSRFToken',
//     xsrfCookieName: 'csrftoken',
//   },
//   createXHR: () => new XMLHttpRequest(),
// })
