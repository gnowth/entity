import React from 'react';
import { storiesOf } from '@storybook/react';

import UIIcon from './index';

storiesOf('UIIcon', module)
  .add('500px', () => <UIIcon name="500px" />)
  .add('amazon with color', () => <UIIcon name="amazon" color="blue" />)
  .add('adn with size', () => <UIIcon name="adn" size="48px" />);
