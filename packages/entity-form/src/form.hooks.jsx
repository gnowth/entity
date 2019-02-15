import React from 'react';

function useOnPreviousChange(value, handler, shadow) {
  const ref = React.useRef();
  const prevValue = ref.current;

  React.useEffect(() => { ref.current = value; });
  React.useEffect(
    () => {
      if (!value.equals(prevValue) && shadow) handler(value);
    },
    [handler, value, shadow],
  );

  return ref.current;
}

export default {
  useProps(props) {
    const [value, setValue] = React.useState(props.value);
    const handleChange = React.useCallback(
      event => setValue(event.target.value),
      [],
    );

    useOnPreviousChange(props.value, setValue, props.shadow);

    return {
      disabled: props.disabled,
      errors: React.useMemo(
        () => (
          props.shadow && !props.value.equals(value)
            ? props.field.validate(value)
            : props.errors
        ),
        [value, props.field, props.shadow, props.errors],
      ),
      field: props.field,
      index: props.index,
      name: props.name,
      nameMapper: props.nameMapper,
      onChange: props.shadow
        ? handleChange
        : props.onChange,
      onSubmit: props.shadow
        ? props.onChange
        : props.onSubmit,
      readOnly: props.readOnly,
      value: props.shadow
        ? value
        : props.value,
      valueInitial: props.shadow
        ? props.value
        : props.valueInitial,
    };
  },
};
