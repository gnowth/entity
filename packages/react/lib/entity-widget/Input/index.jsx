import React from 'react';

import { filterProps } from '../utils';

const WidgetInput = props => (
  <input {...filterProps(props)} />
);

export default WidgetInput;
