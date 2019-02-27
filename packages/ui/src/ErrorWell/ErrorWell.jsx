import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import UIError from '../Error';
import UICard from '../Card';

const UIErrorWell = props => props.errors.size > 0 && (
  <UICard className={props.className} variant="danger">
    { props.errors.map((error, index) => (
      <UIError key={index}>{ error }</UIError> // eslint-disable-line
    ))}
  </UICard>
);

UIErrorWell.propTypes = {
  errors: PropTypesImmutable.list.isRequired,
};

export default React.memo(UIErrorWell);
