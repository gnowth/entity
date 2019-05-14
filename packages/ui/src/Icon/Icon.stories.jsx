import styled, { css, ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { boolean, select } from '@storybook/addon-knobs';

import UIIcon from './Icon';

const iconCss = css`
  margin-right: 0.5rem;
  max-width: 2rem;
  vertical-align: middle;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 1rem;
  position: relative;

  &:after {
    content: '${props => props.label}';
    font-size: 0.75rem;
    left: 50%;
    position: absolute;
    top: calc(100% + 1rem);
    transform: translateX(-50%);
    white-space: pre;
  }
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIIcon
          css={iconCss}
          fontawesome={boolean('fontawesome', false)}
          material={boolean('material', false)}
          name={select('name', ['apple', 'delete', 'plus'], 'apple')}
          variant={select('variant', variant({ name: 'component_uiIcon_' })({ theme }), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiIcon_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UIIcon name="apple" variant={name} />

          { name }
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
