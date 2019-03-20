import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';

import UIError from '../Error';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <UIError>Error</UIError>
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
