import React from 'react';

export default {
  useGetPropsTrigger: (props, styles, hidden, setHidden) => React.useMemo(
    () => Object.assign(
      {
        [props.event]: () => setHidden(!hidden),
        css: styles.icon,
      },
      props.componentProps,
    ),

    [hidden, setHidden, props.componentProps, props.event, styles.icon],
  ),
};
