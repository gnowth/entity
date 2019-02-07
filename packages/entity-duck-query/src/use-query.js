import React from 'react';
import { useDefault } from '@gnowth/default';

import useRedux from './use-redux';

const useClearOnUnmount = (redux, configs) => React.useEffect(() => () => {
  if (!configs.persist) redux.dispatch.clear();

  if (configs.persist && !configs.persistDirty) redux.dispatch.clear({ dirty: true });
}, []);


const useProcessIfNeeded = (redux, configs) => {
  const { store } = useDefault({}, { store: 'store' });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(
    () => {
      const shouldProcess = !configs.action.duck.queries.processing(configs.action, store.getState())
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


export default (configs = {}) => {
  const redux = useRedux(
    configs.action.duck.queries.makeMapStateToProps(configs.action),
    configs.action.duck.queries.makeMapDispatchToProps(configs.action),
  );

  useProcessIfNeeded(redux, configs);
  useClearOnUnmount(redux, configs);

  return {
    clear: redux.dispatch.clear,
    errors: redux.state.errors,
    field: configs.action.duck.entity.getEntityField({ many: configs.action.meta.id === undefined }),
    name: 'entity_duck_use_query',
    onChange: redux.dispatch.onChange,
    pagination: redux.state.pagination,
    processing: redux.state.processing,
    processingDidFail: redux.state.processingDidFail,
    value: redux.state.value,
    valueInitial: redux.state.valueInitial,
  };
};
