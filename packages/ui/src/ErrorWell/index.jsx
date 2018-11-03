import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import UIError from '../Error';
import UIWell from '../Well';

// TODO find relevant key for error
const UIErrorWell = props => props.errors.size > 0 && (
  <UIWell className={props.className} variant="danger">
    { props.errors.map((error, index) => (
      <UIError key={index}>{ error }</UIError> // eslint-disable-line
    ))}
  </UIWell>
);

UIErrorWell.propTypes = {
  errors: PropTypesImmutable.list.isRequired,
};

export default UIErrorWell;
