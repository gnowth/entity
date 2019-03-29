import _ from 'lodash';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { shallowEqual } from '@private/shallow-equal';

const mapDefault = {
  store: 'store',
};

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
