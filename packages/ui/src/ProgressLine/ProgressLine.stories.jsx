import centered from '@storybook/addon-centered';
import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIProgressLine from '.';

const Block = styled.div`
  width: 300px;
`;

export default mod => storiesOf('UI/ProcessingLine', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <Block>
          <UIProgressLine
            color={select('color', Object.values(theme.colors || {}))}
            colorBuffer={select('colorBuffer', Object.values(theme.colors || {}))}
            height={select('height', ['1px', '2px', '4px', '8px', '16px'], '4px')}
            value={select('value', [null, 0, 33, 50, 100], null)}
          />
        </Block>
      )}
    </ThemeConsumer>
  ));
