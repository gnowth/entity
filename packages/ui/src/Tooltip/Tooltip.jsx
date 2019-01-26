import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefaultStyle } from '@gnowth/style';

import UIIcon from '../Icon';
import defaultStyles, { Popup, Wrapper } from './Tooltip.styles';

class UITooltip extends React.Component {
  state = {
    hidden: true,
  }

  handleClick = () => this.setState(prevState => ({ hidden: !prevState.hidden }))

  render() {
    const styles = useDefaultStyle(defaultStyles, this.props.styles);
    const Component = this.props.component;

    return (
      <Wrapper
        className={this.props.className}
        css={this.props.css}
      >
        <Component
          onClick={this.handleClick}
          {...{ css: styles.icon }}
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
  component: UIIcon,
  componentProps: {},
  css: undefined,
  styles: undefined,
};

export default UITooltip;
