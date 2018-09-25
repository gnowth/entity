import axios from 'axios';

export default function setupAxios(settings) {
  axios.defaults.timeout = 30000;
  axios.defaults.baseURL = settings.BASE_API_URL;

  axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.xsrfCookieName = settings.CSRF_COOKIE_NAME || 'csrftoken';
}
