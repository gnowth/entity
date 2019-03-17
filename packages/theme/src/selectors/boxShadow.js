import idx from 'idx';

export default ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.boxshadow: option "name" is required');
  }

  return idx(props, x => x.theme[`boxshadows_${name}`]);
};
