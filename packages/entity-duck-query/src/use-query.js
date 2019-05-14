import React from 'react';
import { useDefault } from '@burnsred/default';
import { useRedux } from '@private/use-redux';
import { List } from 'immutable';

const mapDefault = {
  store: 'store',
};

function useProcessIfNeeded(redux, configs) {
  const { store } = useDefault(mapDefault);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(
    () => {
      const shouldProcess = redux.dispatch.process
        && !(configs.action && configs.action.duck.queries.processing(configs.action, store.getState()))
        && (
          !redux.state.value
          || (!mounted && configs.cached)
        );

      if (shouldProcess) redux.dispatch.process();
      setMounted(true);
    },
    [redux.state.value],
  );
}

function useClearOnUnmount(redux, configs) {
  return React.useEffect(() => () => {
    if (!redux.dispatch.clear) return;

    if (!configs.persist) redux.dispatch.clear();

    if (configs.persist && !configs.persistDirty) redux.dispatch.clear({ dirty: true });
  }, []);
}

function useReduxWithAction(action) {
  return useRedux(...React.useMemo(
    () => [
      action && action.duck.queries.makeMapStateToProps(action),
      action && action.duck.queries.makeMapDispatchToProps(action),
    ],
    [action],
  ));
}

function useErrors(configs = {}) {
  return React.useMemo(
    () => (
      configs.processing || configs.value === undefined
        ? configs.errors || List()
        : configs.field.validate(configs.value).concat(configs.errors || List())
    ),
    [configs.errors, configs.field, configs.processing, configs.value],
  );
}

function useOnChange(configs = {}) {
  return React.useCallback(
    ({ target: { index, name, value } }) => {
      if (process.env.NODE_ENV !== 'production') {
        if (name !== configs.name) throw new Error(`Query.handleChange (${configs.name}): Invalid name ${name}!`);
        if (index === null) throw new Error(`Query.handleChange (${configs.name}): index cannot be null`);
      }

      return configs.onChange(
        index === undefined
          ? value
          : configs.value.set(index, value),
      );
    },
    [configs.name, configs.onChange, configs.value],
  );
}

function useOnSubmit(configs = {}) {
  return React.useCallback(
    ({ target: { index, name, value } }) => {
      if (process.env.NODE_ENV !== 'production') {
        if (name !== configs.name) throw new Error(`Query.handleSubmit (${configs.name}): Invalid name ${name}!`);
        if (index === null) throw new Error(`Query.handleSubmit (${configs.name}): index cannot be null`);
      }

      return configs.onSubmit(
        index === undefined
          ? value
          : configs.value.set(index, value),
      );
    },
    [configs.name, configs.onSubmit, configs.value],
  );
}

function useQuery(configs = {}) {
  const redux = useReduxWithAction(configs.action);
  useProcessIfNeeded(redux, configs);
  useClearOnUnmount(redux, configs);

  const field = configs.action && configs.action.duck.entity.getEntityField({ many: configs.action.meta.id === undefined });
  const name = 'entity_duck_use_query';
  const { processing, value } = redux.state;

  return {
    field,
    name,
    value,
    clear: redux.dispatch.clear,
    errors: useErrors({ field, processing, value, errors: redux.state.errors }),
    onChange: useOnChange({ name, value, onChange: redux.dispatch.onChange }),
    onSubmit: useOnSubmit({ name, value, onSubmit: redux.dispatch.onSubmit }),
    pagination: redux.state.pagination,
    processing: redux.state.processing,
    processingDidFail: redux.state.processingDidFail,
    valueInitial: redux.state.valueInitial,
  };
}

export default useQuery;
