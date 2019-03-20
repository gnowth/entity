import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { IntlProvider } from 'react-intl';

import WidgetInput from '../Input';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <WidgetInput name="test" />
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
