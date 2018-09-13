import React from 'react';
import { storiesOf } from '@storybook/react';

import UIIconMaterialDesign from './index';

storiesOf('UIIconMaterialDesign', module)
  .add('face', () => <UIIconMaterialDesign name="face" />)
  .add('redo with color', () => <UIIconMaterialDesign name="redo" color="blue" />)
  .add('note with size', () => <UIIconMaterialDesign name="note" size="48px" />);
