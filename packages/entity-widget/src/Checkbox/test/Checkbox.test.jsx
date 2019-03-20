import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetCheckbox from '../Checkbox';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetCheckbox />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
