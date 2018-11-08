import centered from '@storybook/addon-centered';
import styled from 'styled-components';
import React from 'react';
import { storiesOf } from '@storybook/react';

import * as colors from './colors';

const Color = styled.div`
  background-color: ${props => props.theme.colors[props.name]};
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  height: 8rem;
  position: relative;
  margin-bottom: 5rem;
  margin-right: 2rem;
  width: 8rem;

  &:after {
    content: '${props => `${props.name}: ${props.theme.colors[props.name]}`}';
    left: 50%;
    position: absolute;
    top: calc(100% + 1rem);
    transform: translateX(-50%);
    white-space: pre;
  }
`;

storiesOf('Colors', module)
  .addDecorator(centered)

  .add('palette', () => (
    <div>
      { Object.keys(colors).map(key => (
        <Color key={key} name={key} />
      ))}
    </div>
  ));
