import React from 'react';
import { storiesOf } from '@storybook/react';

import UIIconFontAwesome from './index';

storiesOf('UIIconFontAwesome', module)
  .add('address-book', () => <UIIconFontAwesome name="address-book" />)
  .add('podcast with color', () => <UIIconFontAwesome name="podcast" color="blue" />)
  .add('telegram with size', () => <UIIconFontAwesome name="telegram" size="48px" />);
