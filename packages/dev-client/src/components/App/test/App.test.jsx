import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import App from '..';

it('renders correctly', () => {
  const tree = renderer
    .create(<App>Test</App>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
