import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { select, text } from '@storybook/addon-knobs';

import UIType from './Type';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIType
          variant={select('variant', variant({ name: 'component_uiType_' })({ theme }), 'body1')}
        >
          { text('children', 'Hello TypeSet') }
        </UIType>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiType_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UIType variant={name}>
            { name }
          </UIType>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
