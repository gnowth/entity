import React from 'react';
import { storiesOf } from '@storybook/react';

import WGText from './index';

storiesOf('WGText', module)
  .add('Basic', () => <WGText />)
  .add('with readOnly', () => <WGText readOnly />)
  .add('with disabled', () => <WGText disabled />);
