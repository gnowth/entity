import centered from '@storybook/addon-centered';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIWell from '.';

const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
`;

export default mod => storiesOf('UI/Well', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

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
