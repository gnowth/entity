import exact from 'prop-types-exact';
import styled from 'styled-components';
import withOnClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import Overlay from './components/Overlay';
import Portal from './components/Portal';
import defaultHooks from './Popup.hooks';

const ContainerComponent = styled.div`
  display: inline-block;
  position: relative;
`;

/**
 * To ignore element outside container, attach className 'ignore-react-onclickoutside' to it
 * https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
 */
function Popup(props) {
  const [opened, setOpened] = React.useState(false);
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const { Container, Content, Control, Component } = hooks.useComponents(props);
  Popup.handleClickOutside = () => setOpened(false);

  return (
    <Container {...hooks.useGetPropsContainer(props)}>
      <Control {...hooks.useGetPropsControl(props, opened, setOpened)} />

      <Component {...hooks.useGetPropsComponent(props, opened)}>
        <Content {...hooks.useGetPropsContent(props)} />
      </Component>
    </Container>
  );
}

Popup.propTypes = exact({
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  contentComponent: PropTypesPlus.component.isRequired,
  contentComponentProps: PropTypes.shape({}),
  controlComponent: PropTypesPlus.component,
  controlComponentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    useGetPropsComponent: PropTypes.func,
    useGetPropsContainer: PropTypes.func,
    useGetPropsContent: PropTypes.func,
    useGetPropsControl: PropTypes.func,
  }),
  type: PropTypesPlus.string,

  // onclickoutside props
  disableOnClickOutside: PropTypes.func.isRequired,
  enableOnClickOutside: PropTypes.func.isRequired,
  eventTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  outsideClickIgnoreClass: PropTypes.string.isRequired,
  preventDefault: PropTypes.bool.isRequired,
  stopPropagation: PropTypes.bool.isRequired,
  wrappedRef: PropTypes.func.isRequired,
});

Popup.defaultProps = {
  component: undefined,
  componentProps: {},
  containerComponent: ContainerComponent,
  containerComponentProps: {},
  contentComponentProps: {},
  controlComponent: undefined,
  controlComponentProps: {},
  event: 'onClick',
  hooks: undefined,
  type: undefined,
};

const clickOutsideConfig = {
  handleClickOutside: () => Popup.handleClickOutside,
};

const EnhancedPopup = withOnClickOutside(Popup, clickOutsideConfig);

EnhancedPopup.Overlay = Overlay;
EnhancedPopup.Portal = Portal;

export default EnhancedPopup;
