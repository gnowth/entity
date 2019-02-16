import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@gnowth/style';
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
          variant={select('variant', variant({ name: 'component_uiType_' })({ theme }), 'body1')}
        >
          { text('children', 'Hello TypeSet') }
        </UITypeSet>
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiType_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UITypeSet variant={name}>
            { name }
          </UITypeSet>
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
