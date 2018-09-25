const settingsMap = {
  production: {
    BASE_URL: 'http://www.gnowth.com/',
    BASE_API_URL: 'http://www.gnowth.com/api',
    ENVIRONMENT: 'production',
    VERSION: 'PROD-1.0.0',
    XDOMAIN_ENABLED: true,
  },
};

export default Object.assign(
  // default settings
  {
    BASE_API_DOMAIN: 'http://localhost:8000',
    BASE_API_URL: 'http://localhost:8000/api',
    BASE_URL: '/',
    CSRF_COOKIE_NAME: 'csrftoken',
    ENVIRONMENT: 'development',
    LANG: ['en'],
    PROJECT_NAME: 'clough',
    VERSION: 'DEV-0.1.0',
    XDOMAIN_ENABLED: true,
  },

  // env settings
  settingsMap[process.env.NODE_ENV],
);
