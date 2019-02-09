export default {
  useGetProps: props => ({
    disabled: props.disabled,
    errors: props.errors,
    field: props.field,
    index: props.index,
    name: props.name,
    nameMapper: props.nameMapper,
    onChange: props.onChange,
    readOnly: props.readOnly,
    value: props.value,
    valueInitial: props.valueInitial,
  }),
};
