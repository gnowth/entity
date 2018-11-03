import styled from 'styled-components';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import UIError from '../Error';

const Well = styled.div`
  border: 1px solid ${props => props.theme.vars.colorDanger};
  border-radius: 4px;
  padding: 16px;
`;

// TODO find relevant key for error
const UIErrorWell = props => props.errors.size > 0 && (
  <Well className={props.className}>
    { props.errors.map((error, index) => (
      <UIError key={index}>{ error }</UIError> // eslint-disable-line
    ))}
  </Well>
);

UIErrorWell.propTypes = {
  errors: PropTypesImmutable.list.isRequired,
};

export default UIErrorWell;
