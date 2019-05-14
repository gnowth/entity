import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { filterProps } from '@burnsred/higher-order-component';
import { component } from '@burnsred/theme';
import { Link } from 'react-router-dom';

const ViewLink = props => (
  <Link
    to={props.field.entity.toLink(props.value)}
    {...filterProps(props)}
  />
);

ViewLink.propTypes = {
  children: PropTypes.node,
  value: PropTypesImmutable.map.isRequired,
  field: PropTypesEntity.entityField.isRequired,
};

ViewLink.defaultProps = {
  children: 'View',
};

export default styled(ViewLink)`
  ${component({ namespace: 'component_viewLink', branch: 'css' })}
  ${props => props.css}
`;
