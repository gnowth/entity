import _ from 'lodash';
import React from 'react';
import { useDefault } from '@burnsred/default';

const mapDefault = {
  store: 'store',
};

function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export default (mapStateToProps = () => ({}), mapDispatchToProps) => {
  const { store } = useDefault(mapDefault);

  const [reduxState, setReduxState] = React.useState(() => mapStateToProps(store.getState()));
  const updateState = () => {
    const newState = mapStateToProps(store.getState());

    if (!shallowEqual(newState, reduxState)) setReduxState(newState);
  };

  React.useEffect(
    () => {
      const unsubscribe = store.subscribe(updateState);

      updateState();

      return unsubscribe;
    },
    [mapStateToProps],
  );

  return React.useMemo(
    () => ({
      state: reduxState,
      dispatch: _.isFunction(mapDispatchToProps)
        ? mapDispatchToProps(store.dispatch)
        : _.mapValues(
          mapDispatchToProps || {},
          func => (...args) => store.dispatch(func(...args)),
        ),
    }),
    [mapDispatchToProps, reduxState],
  );
};
