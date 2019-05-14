import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Content } from './Portal.styles';

class Portal extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prop_visible === nextProps.visible) {
      return {
        prop_visible: nextProps.visible,
        ref: prevState.ref,
      };
    }

    return {
      prop_visible: nextProps.visible,
      ref: prevState.prop_visible === true
        ? null
        : document.createElement('div'),
    };
  }

  state = {
    prop_visible: this.props.visible,
    ref: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible === true && prevProps.visible === false) {
      this.state.ref.style.position = 'fixed';
      this.state.ref.style.top = '0';
      this.state.ref.style.right = '0';
      this.state.ref.style.bottom = '0';
      this.state.ref.style.left = '0';
      document.body.appendChild(this.state.ref);
    }

    if (this.props.visible === false && prevProps.visible === true && prevState.ref) {
      document.body.removeChild(prevState.ref);
    }
  }

  componentWillUnmount() {
    if (this.state.ref) {
      document.body.removeChild(this.state.ref);
    }
  }

  getPropsContainer() {
    return this.props.containerComponentProps;
  }

  getPropsContent() {
    return Object.assign(
      {},
      this.props.contentComponentProps,
      {
        className: this.props.contentComponentProps.className
          ? `${this.props.contentComponentProps.className} ignore-react-onclickoutside`
          : 'ignore-react-onclickoutside',
      },
    );
  }

  renderContent() {
    const ContainerComponent = this.props.containerComponent;
    const ContentComponent = this.props.contentComponent;

    return (
      <ContainerComponent {...this.getPropsContainer()}>
        <ContentComponent {...this.getPropsContent()}>
          { this.props.children }
        </ContentComponent>
      </ContainerComponent>
    );
  }

  render() {
    return this.state.ref && ReactDOM.createPortal(
      this.renderContent(),
      this.state.ref,
    );
  }
}

Portal.propTypes = exact({
  children: PropTypes.node.isRequired,
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  contentComponent: PropTypesPlus.component,
  contentComponentProps: PropTypes.shape({
    className: PropTypesPlus.string,
  }),
  visible: PropTypes.bool.isRequired,
});

Portal.defaultProps = {
  containerComponent: Container,
  containerComponentProps: {},
  contentComponent: Content,
  contentComponentProps: {},
};

export default Portal;
