import centered from '@storybook/addon-centered';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import WidgetTextarea from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default mod => storiesOf('Widget/Textarea', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <WidgetTextarea
          name={text('name', 'storybook')}
          onChange={action('changed')}
          value={text('value', 'Hello Textarea')}
          variant={select('variant', Object.keys(theme.components?.widgetCheckbox || {}), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.widgetCheckbox || {}).map(variant => (
        <Wrapper key={variant}>
          <WidgetTextarea
            name="storybook"
            onChange={() => undefined}
            value={variant}
            variant={variant}
          />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
