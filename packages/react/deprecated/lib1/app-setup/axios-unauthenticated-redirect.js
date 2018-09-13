import axios from 'axios';
import settings from 'settings';

export default function () {
  axios.interceptors.response.use(
    response => response,
    (error) => {
      // If we get any 401 response we redirect the user to the login
      if (error.response && error.response.status === 401) {
        window.location.href = `${settings.LOGIN_URL}?next=${encodeURIComponent(window.location.href)}`;
      }

      return Promise.reject(error);
    },
  );
}
