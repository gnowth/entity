// WORKAROUND(thierry) workaround because namespace not support by typescipt
// export default from './visualisation';
import import_default from './duck';

export default import_default;

export { default as duckMiddleware } from './middleware';

export { default as createDuckReducerFromRequires } from './create-reducer';
