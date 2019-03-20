import idx from 'idx';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import UICard from './Card';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UICard
          variant={select('variant', Object.keys(idx(theme, x => x.components.uiCard) || {}), 'main')}
        >
          { text('children', 'Hello Well') }
        </UICard>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(idx(theme, x => x.components.uiCard) || {}).map(variant => (
        <Wrapper key={variant}>
          <UICard variant={variant}>
            { variant }
          </UICard>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
