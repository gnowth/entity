import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';

import UITypeSet from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <UITypeSet theme={{}}>Test</UITypeSet>
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
