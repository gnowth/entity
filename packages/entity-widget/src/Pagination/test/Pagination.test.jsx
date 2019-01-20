import renderer from 'react-test-renderer';
import React from 'react';

import WidgetPagination from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetPagination />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
