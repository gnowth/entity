import idx from 'idx';

export default props => idx(props, x => x.theme[`images_${props.name}`]);
