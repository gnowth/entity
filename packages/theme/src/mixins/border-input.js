import { color } from '../selectors';

export default props => ({
  backgroundColor: 'hsl(0, 0%, 98%)',
  border: `1px solid ${color({ palette: 'secondary' })(props)}`,
  borderRadius: '4px',
  padding: '9px',
  width: '100%',

  '&:focus': {
    backgroundColor: 'white',
    borderColor: '#2684ff',
    outline: 'none',
    boxShadow: '0 0 0 1px #2684ff',
  },
});
