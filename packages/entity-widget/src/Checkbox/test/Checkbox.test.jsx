import renderer from 'react-test-renderer';
import React from 'react';

import WidgetCheckbox from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetCheckbox
      name="test"
      onChange={() => undefined}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
