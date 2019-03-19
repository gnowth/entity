import React from 'react';

import { FormContext } from './context';
import useInput from './use-input';

function useContextInput(configs) {
  const context = React.useContext(FormContext);

  return useInput(context, configs);
}

export default useContextInput;
