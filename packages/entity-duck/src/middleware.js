import Duck from './duck';

export default configs => store => next => (action = {}) => next(
  action.duck instanceof Duck && action.meta.sideEffect
    ? action.effect(store, configs)
    : action,
);
