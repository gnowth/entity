import axios from 'axios';
import { fromJS } from 'immutable';

import settings from 'settings';

export default function () {
  axios.defaults.timeout = 30000;
  axios.defaults.baseURL = settings.BASE_API_URL;

  axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.xsrfCookieName = settings.CSRF_COOKIE_NAME || 'csrftoken';

  axios.interceptors.response.use(
    response => Object.assign({}, response, { data: fromJS(response.data) }),
    error => Promise.reject(error),
  );
}
