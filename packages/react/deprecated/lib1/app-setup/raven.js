import Raven from 'raven-js'; // eslint-disable-line
import settings from 'settings';

export default function () {
  Raven
    .config(
      settings.SENTRY_DSN,
      { environment: settings.ENVIRONMENT },
    )
    .install();
}
