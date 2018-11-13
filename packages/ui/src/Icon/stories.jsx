import centered from '@storybook/addon-centered';
import styled, { css, ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIIcon from './index';

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

export default mod => storiesOf('UI/Icon', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIIcon
          css={iconCss}
          fontawesome={boolean('fontawesome', false)}
          material={boolean('material', false)}
          name={select('name', ['apple', 'delete', 'plus'], 'apple')}
          variant={select('variant', Object.keys(theme.components?.uiIcon || {}), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.uiIcon || {}).map(variant => (
        <Wrapper key={variant}>
          <UIIcon
            name="apple"
            variant={variant}
          />

          { variant }
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
