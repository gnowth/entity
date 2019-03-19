import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetTestarea from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetTestarea
      name="test"
      onChange={() => undefined}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
