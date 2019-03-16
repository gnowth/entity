export default configs => props => props.theme?.[`var_${configs.name || props.name}_${configs.variant}`];
