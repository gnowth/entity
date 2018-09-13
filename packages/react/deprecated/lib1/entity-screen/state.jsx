import React from 'react';
import PropTypes from 'prop-types';

import { ContextState } from './context';

const State = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    const temp = props.name || props.names;

    if (props.name && props.names) throw new Error('Either "name" or "names" can be used when using "State"');
    if (Array.isArray(temp) ? temp.length === 0 : !temp) throw new Error('"names" or "name" prop is required when using "State"');
    if (props.useValueChange && props.names) throw new Error('"useValueChange" prop is only supported with used with "name" in "State"');
  }

  const Component = this.props.component;

  return (
    <ContextState {...props}>
      { context => (
        <Component
          name={props.name}
          names={props.names}
          value={context.value}
          onChange={context.onChange}
          record={context.record}
          field={context.field}
          fields={context.fields}
        />
      )}
    </ContextState>
  );
};

State.propTypes = {
  name: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.string.isRequired),
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.string.isRequired,
  ]),
  useValueChange: PropTypes.bool,
};

State.defaultProps = {
  name: undefined,
  names: undefined,
  component: undefined,
  useValueChange: false,
};

export default State;
