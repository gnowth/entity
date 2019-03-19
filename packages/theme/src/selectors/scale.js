import idx from 'idx';

export default (configs = {}) => props => idx(props, x => x.theme[`scale_${configs.name}`][configs.index]);
