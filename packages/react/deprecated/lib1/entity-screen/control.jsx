import React from 'react';
import PropTypes from 'prop-types';

import ContextState from './context';

const Control = (props) => {
  const Component = this.props.component;

  return (
    <ContextState
      name={props.name}
      names={props.names}
    >
      { context => (
        <Component
          {...{
            [props.event]: props.action({ entity: context.entity }),
          }}
        />
      )}
    </ContextState>
  );
};

Control.propTypes = {
  action: PropTypes.func.isRequired,
  event: PropTypes.string.isRequired,
};

export default Control;
