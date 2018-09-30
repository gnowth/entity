import ifElse from './if-else';
import isUndefined from './is-undefined';

export default (predicate, propType) => ifElse(
  predicate,
  propType,
  isUndefined,
);
