import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

import WidgetTextarea from './Textarea';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <WidgetTextarea
          name={text('name', 'storybook')}
          onChange={action('changed')}
          value={text('value', 'Hello Textarea')}
          variant={select('variant', variant({ name: 'component_widgetTextarea_' })({ theme }), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_widgetTextarea_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <WidgetTextarea
            name="storybook"
            onChange={() => undefined}
            value={name}
            variant={name}
          />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
