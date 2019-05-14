import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import { color } from '@burnsred/theme';
import { UIIcon } from '@burnsred/ui';

const OptionIndicator = styled(UIIcon)`
  color: ${props => (props.selected ? color({ palette: 'primary' })(props) : color({ palette: 'gray' })(props))};
  cursor: ${props => (props.selected ? 'auto' : 'pointer')};
  font-size: 0.25rem;

  & + & {
    margin-left: 0.25rem;
  }
`;

OptionIndicator.propTypes = {
  material: PropTypes.bool,
  name: PropTypesPlus.string,
};

OptionIndicator.defaultProps = {
  material: true,
  name: 'brightness_1',
};

export default OptionIndicator;
