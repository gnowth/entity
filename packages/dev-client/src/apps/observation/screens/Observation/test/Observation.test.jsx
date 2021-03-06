import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { List } from 'immutable';

import App from 'components/App';
import EntityObservation from 'apps/observation/entities/Observation';

import { Observation } from '../Observation';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <Observation
        errors={List()}
        field={new Fields.EntityField({ entity: EntityObservation })}
        onChange={() => undefined}
        onSubmit={() => undefined}
        value={EntityObservation.dataToRecord({})}
      />
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
