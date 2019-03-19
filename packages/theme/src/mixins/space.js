import margin from './margin';
import padding from './padding';

export default props => ({
  ...margin(props),
  ...padding(props),
});
