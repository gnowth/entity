import React from 'react';

export default function ({ renameHandleValueChange = 'handleValueChange', renameOnChange = 'onChange' } = {}) {
  return ComposedComponent => props => (
    <ComposedComponent
      {...props}
      {...{
        [renameHandleValueChange]: (value, name) => props[renameOnChange]({ target: { name, value } }),
      }}
    />
  );
}
