import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import UIIcon from '../Icon';
import styles, { Popup, Wrapper } from './Tooltip.styles';

class UITooltip extends React.Component {
  state = {
    hidden: true,
  }

  handleClick = () => this.setState(prevState => ({ hidden: !prevState.hidden }))

  render() {
    const Component = this.props.component;

    return (
      <Wrapper
        className={this.props.className}
        css={this.props.css}
      >
        <Component
          onClick={this.handleClick}
          {...{ css: this.props.styles.icon }}
          {...this.props.componentProps}
        />

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
  css: PropTypesPlus.css,
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
  }),
};

UITooltip.defaultProps = {
  styles,
  component: UIIcon,
  componentProps: {},
  css: undefined,
};

export default UITooltip;
