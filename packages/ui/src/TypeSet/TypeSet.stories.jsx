import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';

import UITypeSet from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UITypeSet
          variant={select('variant', Object.keys(theme.typesets || {}), 'text')}
        >
          { text('children', 'Hello TypeSet') }
        </UITypeSet>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.typesets || {}).map(variant => (
        <Wrapper key={variant}>
          <UITypeSet variant={variant}>
            { variant }
          </UITypeSet>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
