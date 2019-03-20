import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetDate from '../Date';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetDate
      name="test"
      onChange={() => undefined}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
