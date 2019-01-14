import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { List } from 'immutable';

import App from 'components/App';
import EntityObservation from 'apps/observation/entities/Observation';

import FormObservation from '..';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <FormObservation
        errors={List()}
        field={new Fields.EntityField({ entity: EntityObservation })}
        onChange={() => undefined}
        value={EntityObservation.dataToRecord({})}
      />
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
