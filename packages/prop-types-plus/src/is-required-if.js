import ifElse from './if-else';

export default (predicate, propType) => ifElse(predicate, propType.isRequired);
