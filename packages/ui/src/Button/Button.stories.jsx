import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import UIButton from './Button';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIButton
          content={text('children', 'Hello Button')}
          disabled={boolean('disabled', false)}
          iconFont="material"
          iconName="delete"
          onClick={action('clicked')}
          palette="primary"
          processing={boolean('processing', false)}
          variant={select('variant', variant({ name: 'component_uiButton_' })({ theme }), 'text')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiButton_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UIButton
            content={name}
            iconFont="material"
            iconName="delete"
            palette="primary"
            variant={name}
          />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
