import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import UIWell from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIWell
          ratio={select('ratio', [1, 2, 4, 8, 16], 1)}
          variant={select('variant', Object.keys(theme.components?.uiWell || {}), 'main')}
        >
          { text('children', 'Hello Well') }
        </UIWell>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.uiWell || {}).map(variant => (
        <Wrapper key={variant}>
          <UIWell variant={variant}>
            { variant }
          </UIWell>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
