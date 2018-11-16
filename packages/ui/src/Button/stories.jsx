import centered from '@storybook/addon-centered';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIButton from './index';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default mod => storiesOf('UI/Button', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIButton
          disabled={boolean('disabled', false)}
          onClick={action('clicked')}
          processing={boolean('processing', false)}
          variant={select('variant', Object.keys(theme.components?.uiButton || {}), 'outlined')}
        >
          { text('children', 'Hello Button') }
        </UIButton>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.uiButton || {}).map(variant => (
        <Wrapper key={variant}>
          <UIButton variant={variant}>
            {variant}
          </UIButton>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
