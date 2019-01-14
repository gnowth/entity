import centered from '@storybook/addon-centered';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UITypeSet from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default mod => storiesOf('UI/TypeSet', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

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
