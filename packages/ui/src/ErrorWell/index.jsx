import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import UIError from '../Error';

// TODO find relevant key for error
const UIErrorWell = props => props.errors.size > 0 && (
  <div className={props.className}>
    { props.errors.map((error, index) => (
      <UIError key={index}>{ error }</UIError> // eslint-disable-line
    ))}
  </div>
);

UIErrorWell.propTypes = {
  errors: PropTypesImmutable.list.isRequired,
};

export default UIErrorWell;
