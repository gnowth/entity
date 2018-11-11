import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIButton from './index';

storiesOf('UI/Button', module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('with children as text', () => (
    <UIButton
      disabled={boolean('disabled', false)}
      onClick={action('clicked')}
      processing={boolean('processing', false)}
      variant={text('variant', 'outlined')}
    >
      { text('children', 'Hello Button') }
    </UIButton>
  ));
