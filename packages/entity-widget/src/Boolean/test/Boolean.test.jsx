import renderer from 'react-test-renderer';
import React from 'react';

import WidgetBoolean from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetBoolean />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
