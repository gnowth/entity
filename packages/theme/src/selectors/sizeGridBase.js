import idx from 'idx';

export default props => idx(props, x => x.theme.var_size_grid) || '0.5rem';
