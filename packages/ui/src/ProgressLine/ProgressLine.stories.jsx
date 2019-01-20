import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';
import { select } from '@storybook/addon-knobs';

import UIProgressLine from '.';

const Block = styled.div`
  width: 300px;
`;

export default stories => stories
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
