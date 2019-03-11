import _isFunction from 'lodash/isFunction';
import React from 'react';

export default {
  useHandleRender(props) {
    const Component = props.component;

    return React.useCallback(
      routerProps => (
        <Component
          {...routerProps}
          {...(
            _isFunction(props.componentProps)
              ? props.componentProps(routerProps)
              : props.componentProps
          )}
        />
      ),
      [props.componentProps],
    );
  },
};
