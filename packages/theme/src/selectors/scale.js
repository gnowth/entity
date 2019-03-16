export default (configs = {}) => props => props.theme?.[`scale_${configs.name}`][configs.index];
