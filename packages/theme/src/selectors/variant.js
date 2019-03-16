export default options => props => Object.keys(props.theme)
  .filter(name => name.startsWith(options.name))
  .map(name => name.replace(options.name, ''));
