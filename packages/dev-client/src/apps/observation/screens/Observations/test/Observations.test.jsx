import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { List } from 'immutable';

import App from 'components/App';
import EntityObservation from 'apps/observation/entities/Observation';

import { Observations } from '..';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <Observations
        field={new Fields.EntityField({ entity: EntityObservation })}
        value={List()}
      />
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
