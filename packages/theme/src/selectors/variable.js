import idx from 'idx';

export default configs => props => idx(props, x => x.theme[`var_${configs.name || props.name}_${configs.variant}`]);
