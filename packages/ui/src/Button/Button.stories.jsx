import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@gnowth/style';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import UIButton from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIButton
          disabled={boolean('disabled', false)}
          onClick={action('clicked')}
          processing={boolean('processing', false)}
          variant={select('variant', variant({ name: 'component_uiButton_' })({ theme }), 'text')}
        >
          { text('children', 'Hello Button') }
        </UIButton>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiButton_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UIButton variant={name}>
            { name }
          </UIButton>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
