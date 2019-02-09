import React from 'react';

import { useDefault } from '@gnowth/default';
import { FormContext } from './context';

const mapDefault = {
  useQuery: ['entityForm_useQuery', 'hook_useQuery'],
};

const useHandleChange = (props, context) => React.useCallback(
  props.array
    ? ({ target }) => context.onChange({
      target: {
        array: true,
        name: context.name,
        value: target.value,
      },
    })
    : ({ target }) => {
      const index = target.getAttribute
        ? target.getAttribute('index') || undefined
        : target.index;

      const field = context.field.getField({ name: props.name });

      const nextValue = props.willChangeRecord({
        field,
        nextRecord: target.name
          ? context.value.setIn(
            index === undefined ? [target.name] : [target.name, index],
            field.clean(target.value),
          )
          : context.value.merge(target.value),
        nextValue: target.value,
        record: context.value,
        value: context.field.getValue(context.value, { name: props.name }),
      });

      return context.onChange({
        target: {
          index: context.index,
          name: context.name,
          value: nextValue,
        },
      });
    },
  [props.name, props.willChangeRecord, props.array, context],
);

function useInput(configs) {
  const computedConfigs = Object.assign({}, useInput.defaultConfigs, configs);

  const [valueInput, setValueInput] = React.useState('');
  const onInputChange = React.useCallback(input => setValueInput(input), []);

  const context = React.useContext(FormContext);
  const defaults = useDefault(mapDefault, computedConfigs);

  const field = context.field.getField({ name: computedConfigs.name });

  const query = defaults.useQuery({
    action: computedConfigs.loadOptionsFromAPI
      ? field.getEntity().duck.actions.get({
        params: Map({ search: valueInput }).merge(computedConfigs.filterParams),
      })
      : undefined,
  });

  return {
    field,
    onInputChange,
    disabled: computedConfigs.disabled,
    errors: context.field.getErrors(context.errors, { name: computedConfigs.name }),
    index: computedConfigs.index,
    name: computedConfigs.name,
    onChange: useHandleChange(computedConfigs, context),
    processing: query.processing,
    processingDidFail: query.processingDidFail,
    readOnly: computedConfigs.readOnly,
    options: computedConfigs.loadOptionsFromAPI
      ? query.value
      : field.getOptions(),
    value: context.field.getValue(context.value, { name: computedConfigs.name }),
    valueInitial: context.field.getValue(context.valueInitial, { name: computedConfigs.name }),
  };
}

useInput.defaultConfigs = {
  willChangeRecord: ({ nextRecord }) => nextRecord,
};

export default useInput;
