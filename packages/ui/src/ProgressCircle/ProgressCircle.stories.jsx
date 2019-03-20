import React from 'react';
import { select } from '@storybook/addon-knobs';

import UIProgressCircle from './ProgressCircle';

export default stories => stories
  .add('dynamic story', () => (
    <UIProgressCircle
      palette={select('palette', ['primary', 'secondary', 'black'])}
      size={select('size', ['16px', '32px', '48px'], '32px')}
      thickness={select('thickness', [10, 20, 40], 20)}
      value={select('value', [null, 0, 33, 50, 100], null)}
    />
  ));
