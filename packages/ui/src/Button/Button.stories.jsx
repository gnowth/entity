import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
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
