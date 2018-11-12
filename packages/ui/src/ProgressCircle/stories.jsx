import centered from '@storybook/addon-centered';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ThemeConsumer } from 'styled-components';

import UIProgressCircle from './index';

export default mod => storiesOf('UI/ProcessingCircle', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIProgressCircle
          color={select('color', Object.values(theme.colors || {}))}
          size={select('size', ['16px', '32px', '48px'], '32px')}
          thickness={select('thickness', [10, 20, 40], 20)}
          value={select('value', [null, 0, 33, 50, 100], null)}
        />
      )}
    </ThemeConsumer>
  ));
