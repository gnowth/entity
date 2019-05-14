import _ from 'lodash';
import React from 'react';
import { useDefault } from '@burnsred/default';

import Portal from './components/Portal';

export default {
  useComponents(props) {
    const mapDefault = React.useMemo(
      () => ({
        wrapperComponent: `uiPopup_component_${props.type}`,
        controlComponent: ['uiPopup_control', 'component_button'],
      }),
      [props.type],
    );

    const defaults = useDefault(mapDefault, props);

    return {
      Component: props.component,
      Container: props.containerComponent,
      Control: defaults.controlComponent,
      Wrapper: defaults.wrapperComponent || Portal,
    };
  },

  /**
   * HACK(thierry): react-onclickoutside use the first instance of the
   * onClose provided. So it is unabled to capture the changing values around it.
   * Hence mutating the staticObject giving it a new onClose
   */
  useGetClickOutside(componentProps) {
    const [staticObject] = React.useState({});

    staticObject.onClose = componentProps.onClose;

    return () => staticObject.onClose();
  },

  usePropsComponent(props, opened, setOpened) {
    const handleClose = React.useCallback(
      (x) => {
        if (!opened) return x;

        setOpened(false);
        props.onClose();
        return x;
      },
      [opened, props.onClose],
    );

    return Object.assign(
      { onClose: handleClose },
      _.isFunction(props.componentProps)
        ? props.componentProps()
        : props.componentProps,
    );
  },

  usePropsContainer(props) {
    return props.containerComponentProps;
  },

  usePropsControl(props, opened, setOpened) {
    const handleEvent = React.useCallback(
      () => setOpened(!opened),
      [opened],
    );

    return Object.assign(
      { [props.event]: handleEvent },
      props.controlComponentProps,
    );
  },

  usePropsWrapper(props, opened) {
    return Object.assign(
      { visible: opened },
      _.isFunction(props.wrapperComponentProps)
        ? props.wrapperComponentProps()
        : props.wrapperComponentProps,
    );
  },
};
