import React from 'react';

import Form from './form';
import PopupShadowInner from './popup-shadow-inner';
import useInput from './use-input';

function PopupShadow(props) {
  const input = useInput();

  return (
    <Form {...input} shadow>
      <PopupShadowInner {...props} />
    </Form>
  );
}

export default React.memo(PopupShadow);
