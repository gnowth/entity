import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIIcon from '../Icon';
import { Popup, Wrapper } from './styles';

class UITooltip extends React.Component {
  state = {
    hidden: true,
  }

  handleClick = () => this.setState(prevState => ({ hidden: !prevState.hidden }))

  render() {
    return (
      <Wrapper>
        <this.props.component {...this.props.componentProps} onClick={this.handleClick} />

        <Popup hidden={this.state.hidden}>
          { this.props.children }
        </Popup>
      </Wrapper>
    );
  }
}

UITooltip.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
};

UITooltip.defaultProps = {
  component: UIIcon,
  componentProps: {},
};

export default UITooltip;
