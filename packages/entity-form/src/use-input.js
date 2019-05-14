import React from 'react';
import { useDefault } from '@burnsred/default';
import { Map } from 'immutable';

const mapDefault = {
  useQuery: ['entityForm_useQuery', 'hook_useQuery'],
};

function useHandleChange(props, configs = {}) {
  return React.useCallback(
    configs.array
      ? ({ target }) => props.onChange({
        target: {
          array: true,
          name: props.name,
          value: target.value,
        },
      })
      : ({ target }) => {
        const index = target.getAttribute
          ? target.getAttribute('index') || undefined
          : target.index;

        const field = props.field.getField(configs);

        const nextValue = configs.willChangeRecord({
          field,
          nextRecord: target.name
            ? props.value.setIn(
              index === undefined ? [target.name] : [target.name, index],
              field.clean(target.value),
            )
            : props.value.merge(target.value),
          nextValue: target.value,
          record: props.value,
          value: props.field.getValue(props.value, configs),
        });

        return props.onChange({
          target: {
            index: props.index,
            name: props.name,
            value: nextValue,
          },
        });
      },
    [configs.name, configs.willChangeRecord, configs.array, props.name, props.index, props.field, props.onChange, props.value],
  );
}

function useHandleSubmit(props, configs = {}) {
  return React.useCallback(
    configs.array
      ? ({ target }) => props.onSubmit({
        target: {
          array: true,
          name: props.name,
          value: target.value,
        },
      })
      : ({ target }) => {
        const index = target.getAttribute
          ? target.getAttribute('index') || undefined
          : target.index;

        const field = props.field.getField(configs);

        return props.onSubmit({
          target: {
            index: props.index,
            name: props.name,
            value: target.name
              ? props.value.setIn(
                index === undefined ? [target.name] : [target.name, index],
                field.clean(target.value),
              )
              : props.value.merge(target.value),
          },
        });
      },
    [configs.name, configs.array, props.value, props.name, props.index, props.onSubmit, props.field],
  );
}

function useInput(props, configs) {
  const computedConfigs = { ...useInput.defaultConfigs, ...configs };
  const [valueInput, setValueInput] = React.useState('');
  const onChangeInput = React.useCallback(input => setValueInput(input), []);
  const defaults = useDefault(mapDefault, computedConfigs);
  const field = props.field.getField({ name: computedConfigs.name });

  const query = defaults.useQuery({
    action: computedConfigs.loadOptionsFromAPI
      ? field.entity.duck.actions.get({
        params: Map({ search: valueInput }).merge(computedConfigs.filterParams),
      })
      : undefined,
  });

  return {
    field,
    onChangeInput,
    disabled: computedConfigs.disabled,
    errors: props.field.getErrors(props.errors, { name: computedConfigs.name }),
    index: computedConfigs.index,
    name: computedConfigs.name,
    onChange: useHandleChange(props, computedConfigs),
    onSubmit: useHandleSubmit(props, computedConfigs),
    processing: query.processing,
    processingDidFail: query.processingDidFail,
    readOnly: computedConfigs.readOnly,
    options: computedConfigs.loadOptionsFromAPI
      ? query.value
      : field.getOptions(),
    value: props.field.getValue(props.value, { name: computedConfigs.name }),
    valueInitial: props.field.getValue(props.valueInitial, { name: computedConfigs.name }),
  };
}

useInput.defaultConfigs = {
  willChangeRecord: ({ nextRecord }) => nextRecord,
};

export default useInput;
