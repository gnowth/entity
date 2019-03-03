import deleteFn from './delete';
import get from './get';
import head from './head';
import options from './options';
import post from './post';
import put from './put';

export { default as mockNull } from './mock-null';

export default {
  get,
  head,
  options,
  post,
  put,
  delete: deleteFn,
  mocking: true,
};
