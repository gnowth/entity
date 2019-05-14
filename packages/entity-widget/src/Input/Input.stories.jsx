import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

import WidgetInput from './Input';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <WidgetInput
          name={text('name', 'storybook')}
          onChange={action('changed')}
          value={text('value', 'Hello Input')}
          variant={select('variant', variant({ name: 'component_widgetInput_' })({ theme }), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_widgetInput_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <WidgetInput
            name="storybook"
            onChange={() => undefined}
            value={name}
            variant={name}
          />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
