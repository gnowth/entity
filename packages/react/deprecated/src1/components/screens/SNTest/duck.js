import { Map } from 'immutable';

import { ScreenDuck } from 'lib/entity-duck';

import SomeEntity from 'entities/SomeEntity';
import ExampleEntity from 'entities/Example';

export default new ScreenDuck({
  store: 'Test',
  initialState: Map({
    someData: '',
    formData: Map({
      someField: '',
      someOtherField: '',
    }),
    debounceForm: Map({
      someField: '',
      someOtherField: '',
    }),
    someEntityForm: SomeEntity.dataToRecord({}),
    exampleForm: ExampleEntity.dataToRecord({}),
  }),
});
