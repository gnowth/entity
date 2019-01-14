import renderer from 'react-test-renderer';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import App from 'components/App';

import Header from '..';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <Router>
        <Header />
      </Router>
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
