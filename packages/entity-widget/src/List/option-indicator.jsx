import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { color } from '@gnowth/style';
import { UIIcon } from '@gnowth/ui';

const OptionIndicator = styled(UIIcon)`
  color: ${props => (props.selected ? color({ name: 'primary' })(props) : color({ name: 'gray' })(props))};
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
