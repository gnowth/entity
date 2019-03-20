import styled from 'styled-components';
import React from 'react';
import { select } from '@storybook/addon-knobs';

import UIProgressLine from './ProgressLine';

const Block = styled.div`
  width: 300px;
`;

export default stories => stories
  .add('dynamic story', () => (
    <Block>
      <UIProgressLine
        bufferPalette={select('bufferPalette', ['primary', 'secondary', 'gray'])}
        height={select('height', ['1px', '2px', '4px', '8px', '16px'], '4px')}
        palette={select('palette', ['primary', 'secondary', 'gray'])}
        value={select('value', [null, 0, 33, 50, 100], null)}
      />
    </Block>
  ));
