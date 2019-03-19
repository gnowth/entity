import React from 'react';

export default {
  usePropsTooltip: (props, styles) => React.useMemo(
    () => ({
      componentProps: {
        css: styles.icon,
        name: 'error',
        material: true,
      },
      css: styles.tooltip,
    }),

    [styles.icon, styles.tooltip],
  ),
};
