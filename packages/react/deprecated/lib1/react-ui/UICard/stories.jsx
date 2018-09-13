import React from 'react';
import { storiesOf } from '@storybook/react';

import SDAux from 'lib/components/std/SDAux';

import UICard from './index';

const uiCard = () => (
  <UICard>
    <SDAux data-slot="title">This is the Header</SDAux>
    <SDAux data-slot="content">This is the content</SDAux>
    <SDAux data-slot="action">This is the action</SDAux>
  </UICard>
);

storiesOf('UICard', module)
  .add('Basic', uiCard);
