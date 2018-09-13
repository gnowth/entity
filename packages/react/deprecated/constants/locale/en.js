import app from './en-app';
import errors from './en-errors';
import options from './en-options';
import components from './en-components';

export default {
  formats: {},
  messages: {
    ...components,
    ...options,
    ...errors,
    ...app,
  },
};
