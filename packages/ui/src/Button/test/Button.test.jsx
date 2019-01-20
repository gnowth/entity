import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import UIButton from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={{}}>
      <IntlProvider locale="en" messages={{}}>
        <UIButton>Test</UIButton>
      </IntlProvider>
    </ThemeProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
