import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import WidgetBoolean from '../Boolean';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetBoolean />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
