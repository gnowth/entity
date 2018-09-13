import React from 'react';
import { storiesOf } from '@storybook/react';

import FormBasicEntity from 'lib/snippets/entities/FormBasic';
import ValueFromStateContainer from 'lib/snippets/containers/ValueFromState';

import FormBasic from './index';

const FormBasicStory = () => (
  <ValueFromStateContainer
    initialValue={FormBasicEntity.dataToRecord({})}
    component={FormBasic}
  />
);

storiesOf('SPForm', module)
  .add('Basic', FormBasicStory);
