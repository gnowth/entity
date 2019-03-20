import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetPagination from '../Pagination';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetPagination />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
