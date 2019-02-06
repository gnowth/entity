import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import DuckScreen from '@entity/duck-namespace-screen';
import React from 'react';
import { EntityTitle } from '@entity/core';
import { Query } from '@entity/duck-query';
import { DefaultProvider } from '@gnowth/default';
import { Map } from 'immutable';
import { Provider } from 'react-redux';

import ViewScreen from '..';

const store = configureStore([])(Map({}));

class EntityTest extends EntityTitle {}
EntityTest.duck = new DuckScreen({ app: 'Test', entity: EntityTest });

it('renders correctly', () => {
  const tree = renderer.create(
    <DefaultProvider store={store}>
      <Provider store={store}>
        <ViewScreen
          queryComponentProps={{
            action: () => EntityTest.duck.actions.get(),
            component: () => <div>Mounted</div>,
          }}
          QueryComponent={Query}
        />
      </Provider>
    </DefaultProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
