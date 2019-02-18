import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';

import UIType from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <UIType>Test</UIType>
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
