import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { filterProps } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';
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
  ${component({ namespace: 'component_viewLink' })}
  ${props => props.css}
`;
