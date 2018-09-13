import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';

import { withSubscribers } from 'lib/react-broadcasts';

const Test = ({ fromScreenState, fromScreenSetState }) => (
  <div>
    <span>Value: {fromScreenState.get('test', 0)}</span>

    <button onClick={() => fromScreenSetState({ test: 50 })}>
      Set to 50
    </button>

    <button onClick={() => fromScreenSetState(Map({ test: 100 }))}>
      Set to 100 with Map
    </button>

    <button onClick={() => fromScreenSetState(prevState => ({ test: prevState.get('test', 0) + 10 }))}>
      Increment by 10
    </button>

    <button onClick={() => fromScreenSetState(prevState => Map({ test: prevState.get('test', 0) - 20 }))}>
      decrement by 20 with Map
    </button>
  </div>
);

Test.propTypes = {
  fromScreenSetState: PropTypes.func.isRequired,
  fromScreenState: PropTypesImmutable.map.isRequired,
};

export default withSubscribers({
  screenState: 'fromScreenState',
  screenSetState: 'fromScreenSetState',
})(Test);
