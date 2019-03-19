import _ from 'lodash';
import React from 'react';

export default {
  useHandleRender(props) {
    const Component = props.component;

    return React.useCallback(
      routerProps => (
        <Component
          {...routerProps}
          {...(
            _.isFunction(props.componentProps)
              ? props.componentProps(routerProps)
              : props.componentProps
          )}
        />
      ),
      [props.componentProps],
    );
  },
};
