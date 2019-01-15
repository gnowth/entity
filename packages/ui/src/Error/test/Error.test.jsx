import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';

import UIError from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <UIError theme={{}}>Error</UIError>
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
