import exact from 'prop-types-exact';
import styled from 'styled-components';
import withOnClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/theme';

import Overlay from './components/Overlay';
import Portal from './components/Portal';
import hooks from './Popup.hooks';

const ContainerComponent = styled.div`
  display: inline-block;
  position: ${props => (props.static ? 'static' : 'relative')};
`;

/**
 * To ignore element outside container, attach className 'ignore-react-onclickoutside' to it
 * https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
 */
function Popup(_props) {
  const [opened, setOpened] = React.useState(false);
  const props = useEnhanceProps(_props, { hooks });
  const { Container, Control, Component, Wrapper } = props.hooks.useComponents(props);
  const componentProps = props.hooks.usePropsComponent(props, opened, setOpened);

  Popup.handleClickOutside = props.hooks.useGetClickOutside(componentProps);

  return (
    <Container {...props.hooks.usePropsContainer(props)}>
      <Control {...props.hooks.usePropsControl(props, opened, setOpened)} />

      <Wrapper {...props.hooks.usePropsWrapper(props, opened)}>
        <Component {...componentProps} />
      </Wrapper>
    </Container>
  );
}

Popup.propTypes = exact({
  component: PropTypesPlus.component.isRequired,
  componentProps: PropTypes.shape({}),
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  controlComponent: PropTypesPlus.component,
  controlComponentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    useGetClickOutside: PropTypes.func,
    usePropsComponent: PropTypes.func,
    usePropsContainer: PropTypes.func,
    usePropsControl: PropTypes.func,
    usePropsWrapper: PropTypes.func,
  }),
  namespace: PropTypesPlus.string,
  onClose: PropTypes.func,
  type: PropTypesPlus.string,
  wrapperComponent: PropTypesPlus.component,
  wrapperComponentProps: PropTypes.shape({}),

  // form props
  name: PropTypesPlus.string,

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
  componentProps: {},
  containerComponent: ContainerComponent,
  containerComponentProps: {},
  controlComponent: undefined,
  controlComponentProps: {},
  event: 'onClick',
  hooks: undefined,
  namespace: 'component_uiPopup',
  onClose: () => undefined,
  type: undefined,
  wrapperComponent: undefined,
  wrapperComponentProps: {},

  // form props
  name: undefined,
};

const clickOutsideConfig = {
  handleClickOutside: () => Popup.handleClickOutside,
};

const EnhancedPopup = withOnClickOutside(Popup, clickOutsideConfig);

EnhancedPopup.Overlay = Overlay;
EnhancedPopup.Portal = Portal;

export default EnhancedPopup;
