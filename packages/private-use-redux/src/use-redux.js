import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';
import React from 'react';
import { useDefault } from '@gnowth/default';

const mapDefault = {
  store: 'store',
};

export default (mapStateToProps, mapDispatchToProps) => {
  const { store } = useDefault(mapDefault);

  const [reduxState, setReduxState] = React.useState(store.getState());

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => setReduxState(store.getState()));
    return () => unsubscribe();
  });

  return React.useMemo(
    () => ({
      state: mapStateToProps?.(reduxState) || {},
      dispatch: _isFunction(mapDispatchToProps)
        ? mapDispatchToProps(store.dispatch)
        : _mapValues(
          mapDispatchToProps || {},
          func => (...args) => store.dispatch(func(...args)),
        ),
    }),
    [mapStateToProps, mapDispatchToProps, reduxState],
  );
};
