import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from './base';

const withNameMapper = (Component) => {
  const NameMapper = props => (
    <Consumer>
      {context => (
        <Component
          {...props}
          name={Array.isArray(props.name)
            ? props.name.map(n => context.mapProps[n] || n)
            : context.mapProps[props.name] || props.name
          }
        />
      )}
    </Consumer>
  );

  NameMapper.propTypes = {
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  };

  NameMapper.defaultProps = {
    name: undefined,
  };

  return NameMapper;
};

export default withNameMapper;
