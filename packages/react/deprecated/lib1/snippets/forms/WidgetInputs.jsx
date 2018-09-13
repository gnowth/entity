import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

const WidgetInputs = props => (
  <div>
    { props.names.map(name => (
      <input
        key={name}
        name={name}
        value={props.value.get(name)}
        onChange={props.onChange}
      />
    ))}
  </div>
);

WidgetInputs.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypesImmutable.map.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WidgetInputs;
