import React from 'react';
import { useDefault } from '@gnowth/default';

import useRedux from './use-redux';

const mapDefault = {
  store: 'store',
};

const useProcessIfNeeded = (redux, configs) => {
  const { store } = useDefault(mapDefault);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(
    () => {
      const shouldProcess = redux.dispatch.process
        && !configs.action?.duck.queries.processing(configs.action, store.getState())
        && (
          !redux.state.value
          || (!mounted && configs.cached)
        );

      if (shouldProcess) redux.dispatch.process();
      setMounted(true);
    },
    [redux.state.value],
  );
};

const useClearOnUnmount = (redux, configs) => React.useEffect(() => () => {
  if (!redux.dispatch.clear) return;

  if (!configs.persist) redux.dispatch.clear();

  if (configs.persist && !configs.persistDirty) redux.dispatch.clear({ dirty: true });
}, []);

const useReduxWithAction = action => useRedux(...React.useMemo(
  () => [
    action?.duck.queries.makeMapStateToProps(action),
    action?.duck.queries.makeMapDispatchToProps(action),
  ],
  [action],
));

const useQuery = (configs = {}) => {
  const redux = useReduxWithAction(configs.action);
  useProcessIfNeeded(redux, configs);
  useClearOnUnmount(redux, configs);

  return {
    clear: redux.dispatch.clear,
    errors: redux.state.errors,
    field: configs.action?.duck.entity.getEntityField({ many: configs.action.meta.id === undefined }),
    name: 'entity_duck_use_query',
    onChange: redux.dispatch.onChange,
    onSubmit: redux.dispatch.onSubmit,
    pagination: redux.state.pagination,
    processing: redux.state.processing,
    processingDidFail: redux.state.processingDidFail,
    value: redux.state.value,
    valueInitial: redux.state.valueInitial,
  };
};

export default useQuery;
