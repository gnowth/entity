import _isFunction from 'lodash/isFunction';
import React from 'react';
import { useDefault } from '@gnowth/default';

import Portal from './components/Portal';

export default {
  useComponents(props) {
    const mapDefault = React.useMemo(
      () => ({
        component: `uiPopup_component_${props.type}`,
        controlComponent: ['uiPopup_control', 'component_button'],
      }),
      [props.type],
    );

    const defaults = useDefault(mapDefault, props);

    return {
      Component: defaults.component || Portal,
      Container: props.containerComponent,
      Content: props.contentComponent,
      Control: defaults.controlComponent,
    };
  },

  useGetPropsComponent(props, opened) {
    return Object.assign(
      { visible: opened },
      _isFunction(props.componentProps)
        ? props.componentProps()
        : props.componentProps,
    );
  },

  useGetPropsContainer(props) {
    return props.containerComponentProps;
  },

  useGetPropsContent(props, setOpened) {
    const handleClose = React.useCallback(() => setOpened(false), []);

    return Object.assign(
      { onClose: handleClose },
      _isFunction(props.contentComponentProps)
        ? props.contentComponentProps()
        : props.contentComponentProps,
    );
  },

  useGetPropsControl(props, opened, setOpened) {
    const handleEvent = React.useCallback(
      () => setOpened(!opened),
      [opened],
    );

    return Object.assign(
      { [props.event]: handleEvent },
      props.controlComponentProps,
    );
  },
};
