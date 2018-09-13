import _pick from 'lodash/fp/pick';
import React from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const { Provider, Consumer } = Context;

const ContextState = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    const temp = props.name || props.names;

    if (props.name && props.names) throw new Error('Either "name" or "names" can be used when using "ContextState"');
    if (Array.isArray(temp) ? temp.length === 0 : !temp) throw new Error('"names" or "name" prop is required when using "ContextState"');
    if (props.useValueChange && props.names) throw new Error('"useValueChange" prop is only supported with used with "name" in "ContextState"');
  }

  return (
    <Consumer>
      { context => props.children({
        value: context.entity.select(context.record, { names: props.name || props.names }),
        onChange: props.useValueChange
          ? value => context.onChange({ target: { value, name: props.name } })
          : context.onChange,
        record: context.record,
        field: props.name && context.entity.fields[props.name],
        fields: props.names && _pick(context.entity.fields, props.names),
      })}
    </Consumer>
  );
};

ContextState.propTypes = {
  name: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.func.isRequired,
  useValueChange: PropTypes.bool,
};

ContextState.defaultProps = {
  name: undefined,
  names: undefined,
  useValueChange: false,
};

export default ContextState;
