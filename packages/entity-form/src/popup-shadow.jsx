import React from 'react';

import Form from './form';
import PopupShadowInner from './popup-shadow-inner';
import useContextInput from './use-context-input';

function PopupShadow(props) {
  const input = useContextInput();

  return (
    <Form {...input} shadow>
      <PopupShadowInner {...props} />
    </Form>
  );
}

export default React.memo(PopupShadow);
