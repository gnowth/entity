import Duck from './duck';

export default store => next => (action = {}) => next(
  action.duck instanceof Duck && action.meta?.sideEffect
    ? action.effect(store)
    : action,
);
