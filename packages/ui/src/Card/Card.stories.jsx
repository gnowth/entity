import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import UICard from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UICard
          ratio={select('ratio', [1, 2, 4, 8, 16], 1)}
          variant={select('variant', Object.keys(theme.components?.uiCard || {}), 'main')}
        >
          { text('children', 'Hello Well') }
        </UICard>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.uiCard || {}).map(variant => (
        <Wrapper key={variant}>
          <UICard variant={variant}>
            { variant }
          </UICard>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
