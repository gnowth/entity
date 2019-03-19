import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetNavigation from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetNavigation />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
