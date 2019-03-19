/* sample */

import centered from '@storybook/addon-centered';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add(
    'with text',
    () => (
      <Button
        onClick={action('clicked')}
        disabled={boolean('disabled', false)}
      >
        { text('children', 'Hello Button') }
      </Button>
    ),
    { notes: 'This button is part of react demo.' },
  )

  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      button
    </Button>
  ));
