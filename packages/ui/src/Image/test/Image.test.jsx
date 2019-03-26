import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIImage from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIImage
      name="image"
      theme={{ images_image: 'path' }}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
