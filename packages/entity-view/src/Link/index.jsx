import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { filterProps } from '@gnowth/higher-order-component';

// TODO add check that entity has toLink
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
  ${props => props.theme.components?.viewLink?.[props.variant || 'main']}
  ${props => props.css}
`;
